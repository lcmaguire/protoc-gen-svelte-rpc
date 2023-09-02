package exampleservice

import (
	"context"
	"fmt"

	connect_go "github.com/bufbuild/connect-go"

	mocks "github.com/lcmaguire/protoc-gen-svelte/mocks"
)

// CreateExample implements tutorial.ExampleService.CreateExample.
func (s *ExampleService) CreateExample(ctx context.Context, req *connect_go.Request[mocks.Example]) (*connect_go.Response[mocks.Example], error) {
	res := connect_go.NewResponse(&mocks.Example{
		Name:        req.Msg.Name,
		DisplayName: req.Msg.DisplayName,
		Active:      req.Msg.Active,
		Count:       req.Msg.Count,
		Extra:       req.Msg.Extra,
		Tags:        req.Msg.Tags,
		Clean:       req.Msg.Clean,
		Nest:        req.Msg.Nest,
		BirdNest:    req.Msg.BirdNest,
		Os:          req.Msg.Os,
	})
	fmt.Println(res.Msg)

	return res, nil // connect_go.NewError(connect_go.CodeUnimplemented, errors.New("not yet implemented"))
}
