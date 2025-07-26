package consumer

import (
	"context"
	"errors"
	"fmt"
	"github.com/segmentio/kafka-go"
	"log"
	"polaris/internal/svc"
	"sync"
)

type KafkaConsumer struct {
	reader *kafka.Reader
	mu     sync.Mutex
	wg     sync.WaitGroup
}

func ProcessMessages(
	svcCtx *svc.ServiceContext,
	reader *kafka.Reader,
	msgCh <-chan kafka.Message,
	errCh <-chan error,
) {
	for {
		select {
		case msg := <-msgCh:
			// 处理消息（如果失败会触发重试）
			if err := HandleTransfer(svcCtx, msg); err != nil {
				// 重要：处理失败时不提交偏移量，让消息重新消费
				log.Printf("⚠️ 消息处理失败，将重新消费: %v", err)
				continue
			}

			// 处理成功，手动提交偏移量
			if err := reader.CommitMessages(context.Background(), msg); err != nil {
				log.Printf("提交偏移量失败: %v", err)
			}

		case err := <-errCh:
			handleKafkaError(err)
		}
	}
}

func (k *KafkaConsumer) Start(ctx context.Context) (<-chan kafka.Message, <-chan error) {
	k.mu.Lock()
	defer k.mu.Unlock()

	msgCh := make(chan kafka.Message, 100)
	errCh := make(chan error, 1)

	k.wg.Add(1)
	go func() {
		defer k.wg.Done()
		defer close(msgCh)
		defer close(errCh)

		for {
			select {
			case <-ctx.Done():
				return
			default:
				msg, err := k.reader.ReadMessage(ctx)
				if err != nil {
					if errors.Is(err, context.Canceled) {
						return
					}
					errCh <- fmt.Errorf("read message error: %w", err)
					continue
				}

				// 提交偏移量（可选）
				if err := k.reader.CommitMessages(ctx, msg); err != nil {
					errCh <- fmt.Errorf("commit message error: %w", err)
					continue
				}

				select {
				case msgCh <- msg:
				case <-ctx.Done():
					return
				}
			}
		}
	}()

	return msgCh, errCh
}

func (k *KafkaConsumer) Stop() error {
	k.mu.Lock()
	defer k.mu.Unlock()
	if k.reader == nil {
		return nil
	}
	err := k.reader.Close()
	k.reader = nil
	return err
}
