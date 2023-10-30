// @generated by protoc-gen-connect-es v1.1.3
// @generated from file example.proto (package tutorial, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Example, Extra } from "./example_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service tutorial.ExampleService
 */
export declare const ExampleService: {
  readonly typeName: "tutorial.ExampleService",
  readonly methods: {
    /**
     * @generated from rpc tutorial.ExampleService.CreateExample
     */
    readonly createExample: {
      readonly name: "CreateExample",
      readonly I: typeof Example,
      readonly O: typeof Example,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.CreateExtra
     */
    readonly createExtra: {
      readonly name: "CreateExtra",
      readonly I: typeof Extra,
      readonly O: typeof Extra,
      readonly kind: MethodKind.Unary,
    },
  }
};

