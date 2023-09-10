package exampleservice

import (
	"context"
	"fmt"

	connect_go "connectrpc.com/connect"

	mocks "github.com/lcmaguire/protoc-gen-svelte/mocks"
)

// CreateExample implements tutorial.ExampleService.CreateExample.
func (s *ExampleService) CreateExample(ctx context.Context, req *connect_go.Request[mocks.Example]) (*connect_go.Response[mocks.Example], error) {
	res := connect_go.NewResponse(req.Msg)
	fmt.Println(res.Msg)
	return res, nil
}
