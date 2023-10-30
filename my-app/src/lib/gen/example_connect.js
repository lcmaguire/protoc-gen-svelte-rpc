// @generated by protoc-gen-connect-es v1.1.3
// @generated from file example.proto (package tutorial, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Example, Extra } from "./example_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service tutorial.ExampleService
 */
export const ExampleService = {
  typeName: "tutorial.ExampleService",
  methods: {
    /**
     * @generated from rpc tutorial.ExampleService.CreateExample
     */
    createExample: {
      name: "CreateExample",
      I: Example,
      O: Example,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tutorial.ExampleService.CreateExtra
     */
    createExtra: {
      name: "CreateExtra",
      I: Extra,
      O: Extra,
      kind: MethodKind.Unary,
    },
  }
};

