// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: example.proto

package mocksconnect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	mocks "github.com/lcmaguire/protoc-gen-svelte/mocks"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion0_1_0

const (
	// ExampleServiceName is the fully-qualified name of the ExampleService service.
	ExampleServiceName = "tutorial.ExampleService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// ExampleServiceCreateExampleProcedure is the fully-qualified name of the ExampleService's
	// CreateExample RPC.
	ExampleServiceCreateExampleProcedure = "/tutorial.ExampleService/CreateExample"
)

// ExampleServiceClient is a client for the tutorial.ExampleService service.
type ExampleServiceClient interface {
	CreateExample(context.Context, *connect.Request[mocks.Example]) (*connect.Response[mocks.Example], error)
}

// NewExampleServiceClient constructs a client for the tutorial.ExampleService service. By default,
// it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and
// sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC()
// or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewExampleServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) ExampleServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &exampleServiceClient{
		createExample: connect.NewClient[mocks.Example, mocks.Example](
			httpClient,
			baseURL+ExampleServiceCreateExampleProcedure,
			opts...,
		),
	}
}

// exampleServiceClient implements ExampleServiceClient.
type exampleServiceClient struct {
	createExample *connect.Client[mocks.Example, mocks.Example]
}

// CreateExample calls tutorial.ExampleService.CreateExample.
func (c *exampleServiceClient) CreateExample(ctx context.Context, req *connect.Request[mocks.Example]) (*connect.Response[mocks.Example], error) {
	return c.createExample.CallUnary(ctx, req)
}

// ExampleServiceHandler is an implementation of the tutorial.ExampleService service.
type ExampleServiceHandler interface {
	CreateExample(context.Context, *connect.Request[mocks.Example]) (*connect.Response[mocks.Example], error)
}

// NewExampleServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewExampleServiceHandler(svc ExampleServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	exampleServiceCreateExampleHandler := connect.NewUnaryHandler(
		ExampleServiceCreateExampleProcedure,
		svc.CreateExample,
		opts...,
	)
	return "/tutorial.ExampleService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case ExampleServiceCreateExampleProcedure:
			exampleServiceCreateExampleHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedExampleServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedExampleServiceHandler struct{}

func (UnimplementedExampleServiceHandler) CreateExample(context.Context, *connect.Request[mocks.Example]) (*connect.Response[mocks.Example], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("tutorial.ExampleService.CreateExample is not implemented"))
}
