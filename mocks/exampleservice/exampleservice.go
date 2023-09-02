package exampleservice

import (
	mocksconnect "github.com/lcmaguire/protoc-gen-svelte/mocks/mocksconnect"
)

// ExampleService implements tutorial.ExampleService.
type ExampleService struct {
	mocksconnect.UnimplementedExampleServiceHandler
}

func NewExampleService() *ExampleService {
	return &ExampleService{}
}
