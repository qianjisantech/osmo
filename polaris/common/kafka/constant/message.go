package constant

type Message struct {
	ID        string `json:"id"`
	Content   string `json:"content"`
	Timestamp string `json:"timestamp"`
	ApiId     string `json:"api_id"`
	TaskId    string `json:"task_id"`
}
