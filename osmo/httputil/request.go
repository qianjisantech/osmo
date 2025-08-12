package httputil

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// 定义常用Content-Type
const (
	ContentTypeJSON      = "application/json"
	ContentTypeForm      = "application/x-www-form-urlencoded"
	ContentTypeMultipart = "multipart/form-data"
)

// HTTPClient HTTP客户端接口
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// Client HTTP请求客户端
type Client struct {
	client     HTTPClient
	baseURL    string
	headers    map[string]string
	retryCount int
	retryDelay time.Duration
	timeout    time.Duration
	logger     Logger
}

// Logger 日志接口
type Logger interface {
	Infof(format string, args ...interface{})
	Errorf(format string, args ...interface{})
}

// Option 客户端配置选项
type Option func(*Client)

// NewClient 创建新的HTTP客户端
func NewClient(options ...Option) *Client {
	c := &Client{
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
		headers:    make(map[string]string),
		retryCount: 0,
		retryDelay: 1 * time.Second,
		timeout:    30 * time.Second,
	}

	for _, opt := range options {
		opt(c)
	}

	return c
}

// WithBaseURL 设置基础URL
func WithBaseURL(baseURL string) Option {
	return func(c *Client) {
		c.baseURL = baseURL
	}
}

// WithTimeout 设置超时时间
func WithTimeout(timeout time.Duration) Option {
	return func(c *Client) {
		c.timeout = timeout
		c.client.(*http.Client).Timeout = timeout
	}
}

// WithRetry 设置重试次数和间隔
func WithRetry(count int, delay time.Duration) Option {
	return func(c *Client) {
		c.retryCount = count
		c.retryDelay = delay
	}
}

// WithLogger 设置日志记录器
func WithLogger(logger Logger) Option {
	return func(c *Client) {
		c.logger = logger
	}
}

// WithHeader 设置默认请求头
func WithHeader(key, value string) Option {
	return func(c *Client) {
		c.headers[key] = value
	}
}

// WithHeaders 批量设置请求头
func WithHeaders(headers map[string]string) Option {
	return func(c *Client) {
		for k, v := range headers {
			c.headers[k] = v
		}
	}
}

// WithHTTPClient 自定义HTTP客户端
func WithHTTPClient(client HTTPClient) Option {
	return func(c *Client) {
		c.client = client
	}
}

// Get 发送GET请求
func (c *Client) Get(ctx context.Context, path string, params map[string]string, headers map[string]string) (*http.Response, error) {
	return c.doRequest(ctx, http.MethodGet, path, params, nil, headers)
}

// Post 发送POST请求
func (c *Client) Post(ctx context.Context, path string, body interface{}, headers map[string]string) (*http.Response, error) {
	return c.doRequest(ctx, http.MethodPost, path, nil, body, headers)
}

// PostForm 发送表单POST请求
func (c *Client) PostForm(ctx context.Context, path string, formData map[string]string, headers map[string]string) (*http.Response, error) {
	if headers == nil {
		headers = make(map[string]string)
	}
	headers["Content-Type"] = ContentTypeForm

	data := url.Values{}
	for k, v := range formData {
		data.Add(k, v)
	}

	return c.doRequest(ctx, http.MethodPost, path, nil, strings.NewReader(data.Encode()), headers)
}

// Put 发送PUT请求
func (c *Client) Put(ctx context.Context, path string, body interface{}, headers map[string]string) (*http.Response, error) {
	return c.doRequest(ctx, http.MethodPut, path, nil, body, headers)
}

// Delete 发送DELETE请求
func (c *Client) Delete(ctx context.Context, path string, params map[string]string, headers map[string]string) (*http.Response, error) {
	return c.doRequest(ctx, http.MethodDelete, path, params, nil, headers)
}

// doRequest 执行HTTP请求
func (c *Client) doRequest(
	ctx context.Context,
	method string,
	path string,
	params map[string]string,
	body interface{},
	headers map[string]string,
) (*http.Response, error) {
	// 构建完整URL
	fullURL, err := c.buildURL(path, params)
	if err != nil {
		return nil, fmt.Errorf("build URL failed: %v", err)
	}

	// 转换请求体
	var reqBody io.Reader
	if body != nil {
		switch v := body.(type) {
		case io.Reader:
			reqBody = v
		case []byte:
			reqBody = bytes.NewBuffer(v)
		case string:
			reqBody = strings.NewReader(v)
		default:
			jsonData, err := json.Marshal(body)
			if err != nil {
				return nil, fmt.Errorf("marshal body failed: %v", err)
			}
			reqBody = bytes.NewBuffer(jsonData)
			if headers == nil {
				headers = make(map[string]string)
			}
			if _, ok := headers["Content-Type"]; !ok {
				headers["Content-Type"] = ContentTypeJSON
			}
		}
	}

	// 创建请求
	req, err := http.NewRequestWithContext(ctx, method, fullURL, reqBody)
	if err != nil {
		return nil, fmt.Errorf("create request failed: %v", err)
	}

	// 设置请求头
	c.setHeaders(req, headers)

	// 记录请求日志
	c.logRequest(req)

	// 发送请求（带重试机制）
	var resp *http.Response
	var lastErr error

	for attempt := 0; attempt <= c.retryCount; attempt++ {
		if attempt > 0 {
			time.Sleep(c.retryDelay)
			if c.logger != nil {
				c.logger.Infof("Retrying request (attempt %d/%d): %s %s", attempt, c.retryCount, method, fullURL)
			}
		}

		resp, lastErr = c.client.Do(req)
		if lastErr == nil {
			break
		}

		// 如果是最后一次尝试仍然失败，则返回错误
		if attempt == c.retryCount {
			return nil, fmt.Errorf("request failed after %d attempts: %v", c.retryCount+1, lastErr)
		}
	}

	// 记录响应日志
	c.logResponse(resp)

	return resp, nil
}

// buildURL 构建完整URL
func (c *Client) buildURL(path string, params map[string]string) (string, error) {
	u, err := url.Parse(c.baseURL + path)
	if err != nil {
		return "", err
	}

	if params != nil {
		q := u.Query()
		for k, v := range params {
			q.Add(k, v)
		}
		u.RawQuery = q.Encode()
	}

	return u.String(), nil
}

// setHeaders 设置请求头
func (c *Client) setHeaders(req *http.Request, headers map[string]string) {
	// 设置默认请求头
	for k, v := range c.headers {
		req.Header.Set(k, v)
	}

	// 设置本次请求特定的请求头
	for k, v := range headers {
		req.Header.Set(k, v)
	}
}

// logRequest 记录请求日志
func (c *Client) logRequest(req *http.Request) {
	if c.logger == nil {
		return
	}

	var body string
	if req.Body != nil {
		buf := new(bytes.Buffer)
		buf.ReadFrom(req.Body)
		body = buf.String()
		// 重新设置Body，因为ReadFrom消耗了它
		req.Body = io.NopCloser(bytes.NewBufferString(body))
	}

	c.logger.Infof("Request: %s %s\nHeaders: %v\nBody: %s",
		req.Method, req.URL.String(), req.Header, body)
}

// logResponse 记录响应日志
func (c *Client) logResponse(resp *http.Response) {
	if c.logger == nil || resp == nil {
		return
	}

	var body string
	if resp.Body != nil {
		buf := new(bytes.Buffer)
		buf.ReadFrom(resp.Body)
		body = buf.String()
		// 重新设置Body，因为ReadFrom消耗了它
		resp.Body = io.NopCloser(bytes.NewBufferString(body))
	}

	c.logger.Infof("Response: Status: %s\nHeaders: %v\nBody: %s",
		resp.Status, resp.Header, body)
}

// ParseJSONResponse 解析JSON响应
func (c *Client) ParseJSONResponse(resp *http.Response, v interface{}) error {
	if resp == nil {
		return errors.New("response is nil")
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	if err := json.NewDecoder(resp.Body).Decode(v); err != nil {
		return fmt.Errorf("decode response failed: %v", err)
	}

	return nil
}

// MustParseJSONResponse 解析JSON响应，失败时panic
func (c *Client) MustParseJSONResponse(resp *http.Response, v interface{}) {
	if err := c.ParseJSONResponse(resp, v); err != nil {
		panic(fmt.Sprintf("parse JSON response failed: %v", err))
	}
}

// GetString 获取响应字符串
func (c *Client) GetString(resp *http.Response) (string, error) {
	if resp == nil {
		return "", errors.New("response is nil")
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read response body failed: %v", err)
	}

	return string(data), nil
}
