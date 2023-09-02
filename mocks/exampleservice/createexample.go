package exampleservice

import (
	"context"
	"errors"
	connect_go "github.com/bufbuild/connect-go"

	mocks "github.com/lcmaguire/protoc-gen-svelte/mocks"
)

// CreateExample implements tutorial.ExampleService.CreateExample.
func (s *ExampleService) CreateExample(ctx context.Context, req *connect_go.Request[mocks.Example]) (*connect_go.Response[mocks.Example], error) {
	res := connect_go.NewResponse(&mocks.Example{})
	return res, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("not yet implemented"))
}
