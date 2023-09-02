// @generated by protoc-gen-es v1.3.1
// @generated from file example.proto (package tutorial, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * enum
 *
 * @generated from enum tutorial.Cleanliness
 */
export declare enum Cleanliness {
  /**
   * @generated from enum value: CLEANLINESS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CLEANLINESS_DISGUSTING = 1;
   */
  DISGUSTING = 1,

  /**
   * @generated from enum value: CLEANLINESS_BAD = 2;
   */
  BAD = 2,

  /**
   * @generated from enum value: CLEANLINESS_GOOD = 3;
   */
  GOOD = 3,

  /**
   * @generated from enum value: CLEANLINESS_EXCELLENT = 4;
   */
  EXCELLENT = 4,
}

/**
 * @generated from message tutorial.Example
 */
export declare class Example extends Message<Example> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: string display_name = 2;
   */
  displayName: string;

  /**
   * @generated from field: bool active = 3;
   */
  active: boolean;

  /**
   * @generated from field: int32 count = 4;
   */
  count: number;

  /**
   * @generated from field: tutorial.Extra extra = 5;
   */
  extra?: Extra;

  /**
   * try embedded message
   *
   * @generated from field: repeated string tags = 6;
   */
  tags: string[];

  /**
   * @generated from field: tutorial.Example.Nest nest = 7;
   */
  nest?: Example_Nest;

  /**
   * enum
   *
   * @generated from field: tutorial.Cleanliness clean = 8;
   */
  clean: Cleanliness;

  /**
   * @generated from field: tutorial.Example.BirdNest bird_nest = 9;
   */
  birdNest: Example_BirdNest;

  /**
   * @generated from field: tutorial.OperatingSystem os = 10;
   */
  os?: OperatingSystem;

  constructor(data?: PartialMessage<Example>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "tutorial.Example";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Example;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Example;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Example;

  static equals(a: Example | PlainMessage<Example> | undefined, b: Example | PlainMessage<Example> | undefined): boolean;
}

/**
 * embedded enum
 *
 * @generated from enum tutorial.Example.BirdNest
 */
export declare enum Example_BirdNest {
  /**
   * @generated from enum value: BIRD_NEST_UNDEFINED = 0;
   */
  UNDEFINED = 0,

  /**
   * @generated from enum value: BIRD_NEST_DESTROYED = 1;
   */
  DESTROYED = 1,

  /**
   * @generated from enum value: BIRD_NEST_BUILT = 2;
   */
  BUILT = 2,
}

/**
 * @generated from message tutorial.Example.Nest
 */
export declare class Example_Nest extends Message<Example_Nest> {
  /**
   * @generated from field: string info = 1;
   */
  info: string;

  constructor(data?: PartialMessage<Example_Nest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "tutorial.Example.Nest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Example_Nest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Example_Nest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Example_Nest;

  static equals(a: Example_Nest | PlainMessage<Example_Nest> | undefined, b: Example_Nest | PlainMessage<Example_Nest> | undefined): boolean;
}

/**
 * @generated from message tutorial.Extra
 */
export declare class Extra extends Message<Extra> {
  /**
   * @generated from field: string more = 1;
   */
  more: string;

  constructor(data?: PartialMessage<Extra>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "tutorial.Extra";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Extra;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Extra;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Extra;

  static equals(a: Extra | PlainMessage<Extra> | undefined, b: Extra | PlainMessage<Extra> | undefined): boolean;
}

/**
 * @generated from message tutorial.GetExampleRequest
 */
export declare class GetExampleRequest extends Message<GetExampleRequest> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  constructor(data?: PartialMessage<GetExampleRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "tutorial.GetExampleRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetExampleRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetExampleRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetExampleRequest;

  static equals(a: GetExampleRequest | PlainMessage<GetExampleRequest> | undefined, b: GetExampleRequest | PlainMessage<GetExampleRequest> | undefined): boolean;
}

/**
 * @generated from message tutorial.OperatingSystem
 */
export declare class OperatingSystem extends Message<OperatingSystem> {
  /**
   * @generated from oneof tutorial.OperatingSystem.operating_system
   */
  operatingSystem: {
    /**
     * @generated from field: string windows_version = 1;
     */
    value: string;
    case: "windowsVersion";
  } | {
    /**
     * @generated from field: string mac_version = 2;
     */
    value: string;
    case: "macVersion";
  } | {
    /**
     * @generated from field: string linux_distro = 3;
     */
    value: string;
    case: "linuxDistro";
  } | { case: undefined; value?: undefined };

  constructor(data?: PartialMessage<OperatingSystem>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "tutorial.OperatingSystem";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): OperatingSystem;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): OperatingSystem;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): OperatingSystem;

  static equals(a: OperatingSystem | PlainMessage<OperatingSystem> | undefined, b: OperatingSystem | PlainMessage<OperatingSystem> | undefined): boolean;
}

