// @generated by protoc-gen-es v1.3.1
// @generated from file example.proto (package tutorial, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * enum
 *
 * @generated from enum tutorial.Cleanliness
 */
export const Cleanliness = proto3.makeEnum(
  "tutorial.Cleanliness",
  [
    {no: 0, name: "CLEANLINESS_UNSPECIFIED", localName: "UNSPECIFIED"},
    {no: 1, name: "CLEANLINESS_DISGUSTING", localName: "DISGUSTING"},
    {no: 2, name: "CLEANLINESS_BAD", localName: "BAD"},
    {no: 3, name: "CLEANLINESS_GOOD", localName: "GOOD"},
    {no: 4, name: "CLEANLINESS_EXCELLENT", localName: "EXCELLENT"},
  ],
);

/**
 * @generated from message tutorial.Example
 */
export const Example = proto3.makeMessageType(
  "tutorial.Example",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "display_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "active", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "extra", kind: "message", T: Extra },
    { no: 6, name: "tags", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 8, name: "clean", kind: "enum", T: proto3.getEnumType(Cleanliness) },
    { no: 9, name: "bird_nest", kind: "enum", T: proto3.getEnumType(Example_BirdNest) },
  ],
);

/**
 * embedded enum
 *
 * @generated from enum tutorial.Example.BirdNest
 */
export const Example_BirdNest = proto3.makeEnum(
  "tutorial.Example.BirdNest",
  [
    {no: 0, name: "BIRD_NEST_UNDEFINED", localName: "UNDEFINED"},
    {no: 1, name: "BIRD_NEST_DESTROYED", localName: "DESTROYED"},
    {no: 2, name: "BIRD_NEST_BUILT", localName: "BUILT"},
  ],
);

/**
 * @generated from message tutorial.Extra
 */
export const Extra = proto3.makeMessageType(
  "tutorial.Extra",
  () => [
    { no: 1, name: "more", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message tutorial.GetExampleRequest
 */
export const GetExampleRequest = proto3.makeMessageType(
  "tutorial.GetExampleRequest",
  () => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

