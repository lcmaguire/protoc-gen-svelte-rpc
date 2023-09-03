# protoc-gen-svelte-rpc


work in progress

will generate 

- svelte components for all messages in a proto file (input + view components).
- svelte component for all methods in a proto file
- svelte route/+page.svelte file for all methods (viewable at /{{MethodName}})


| fieldKind | supported          | Repeated           | nested             |
| --------- | ------------------ | ------------------ | ------------------ |
| scalar    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| message   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| enum      | :white_check_mark: | :x:                | :white_check_mark: |
| oneof     | :white_check_mark: | :moyai:            | :white_check_mark: |
| maps      | :x:                | :moyai:            | :x:                |


:moyai: indicates it is unsupported by proto feature see [proto-guide](https://protobuf.dev/programming-guides/proto3/)

