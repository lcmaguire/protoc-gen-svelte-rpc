package exampleservice

import (
	"context"
	"fmt"

	connect_go "connectrpc.com/connect"

	mocks "github.com/lcmaguire/protoc-gen-svelte/mocks"
)

// CreateExample implements tutorial.ExampleService.CreateExample.
func (s *ExampleService) CreateExample(ctx context.Context, req *connect_go.Request[mocks.Example]) (*connect_go.Response[mocks.Example], error) {
	res := connect_go.NewResponse(&mocks.Example{
		Extra:    req.Msg.Extra,
		Nest:     req.Msg.Nest,
		Colours:  req.Msg.Colours,
		BirdNest: req.Msg.BirdNest,
		Os:       req.Msg.Os,
		Tree:     req.Msg.Tree,
	})
	fmt.Println(res.Msg)
	return res, nil
}
