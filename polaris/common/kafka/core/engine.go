package core

import (
	"context"
	"errors"
	"fmt"
	"github.com/segmentio/kafka-go"
	"sync"
)

type KafkaConsumer struct {
	reader *kafka.Reader
	mu     sync.Mutex
	wg     sync.WaitGroup
}

func (k *KafkaConsumer) GetReader() *kafka.Reader {
	k.mu.Lock()
	defer k.mu.Unlock()
	return k.reader
}
func NewConsumerEngine(brokers []string, topic, groupID string, config kafka.ReaderConfig) *KafkaConsumer {
	config.Brokers = brokers
	config.Topic = topic
	config.GroupID = groupID

	return &KafkaConsumer{
		reader: kafka.NewReader(config),
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
