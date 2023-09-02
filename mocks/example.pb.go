// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: example.proto

package mocks

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// enum
type Cleanliness int32

const (
	Cleanliness_CLEANLINESS_UNSPECIFIED Cleanliness = 0
	Cleanliness_CLEANLINESS_DISGUSTING  Cleanliness = 1
	Cleanliness_CLEANLINESS_BAD         Cleanliness = 2
	Cleanliness_CLEANLINESS_GOOD        Cleanliness = 3
	Cleanliness_CLEANLINESS_EXCELLENT   Cleanliness = 4
)

// Enum value maps for Cleanliness.
var (
	Cleanliness_name = map[int32]string{
		0: "CLEANLINESS_UNSPECIFIED",
		1: "CLEANLINESS_DISGUSTING",
		2: "CLEANLINESS_BAD",
		3: "CLEANLINESS_GOOD",
		4: "CLEANLINESS_EXCELLENT",
	}
	Cleanliness_value = map[string]int32{
		"CLEANLINESS_UNSPECIFIED": 0,
		"CLEANLINESS_DISGUSTING":  1,
		"CLEANLINESS_BAD":         2,
		"CLEANLINESS_GOOD":        3,
		"CLEANLINESS_EXCELLENT":   4,
	}
)

func (x Cleanliness) Enum() *Cleanliness {
	p := new(Cleanliness)
	*p = x
	return p
}

func (x Cleanliness) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Cleanliness) Descriptor() protoreflect.EnumDescriptor {
	return file_example_proto_enumTypes[0].Descriptor()
}

func (Cleanliness) Type() protoreflect.EnumType {
	return &file_example_proto_enumTypes[0]
}

func (x Cleanliness) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Cleanliness.Descriptor instead.
func (Cleanliness) EnumDescriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{0}
}

// embedded enum
type Example_BirdNest int32

const (
	Example_BIRD_NEST_UNDEFINED Example_BirdNest = 0
	Example_BIRD_NEST_DESTROYED Example_BirdNest = 1
	Example_BIRD_NEST_BUILT     Example_BirdNest = 2
)

// Enum value maps for Example_BirdNest.
var (
	Example_BirdNest_name = map[int32]string{
		0: "BIRD_NEST_UNDEFINED",
		1: "BIRD_NEST_DESTROYED",
		2: "BIRD_NEST_BUILT",
	}
	Example_BirdNest_value = map[string]int32{
		"BIRD_NEST_UNDEFINED": 0,
		"BIRD_NEST_DESTROYED": 1,
		"BIRD_NEST_BUILT":     2,
	}
)

func (x Example_BirdNest) Enum() *Example_BirdNest {
	p := new(Example_BirdNest)
	*p = x
	return p
}

func (x Example_BirdNest) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Example_BirdNest) Descriptor() protoreflect.EnumDescriptor {
	return file_example_proto_enumTypes[1].Descriptor()
}

func (Example_BirdNest) Type() protoreflect.EnumType {
	return &file_example_proto_enumTypes[1]
}

func (x Example_BirdNest) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Example_BirdNest.Descriptor instead.
func (Example_BirdNest) EnumDescriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{0, 0}
}

type Example struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name        string        `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	DisplayName string        `protobuf:"bytes,2,opt,name=display_name,json=displayName,proto3" json:"display_name,omitempty"`
	Active      bool          `protobuf:"varint,3,opt,name=active,proto3" json:"active,omitempty"`
	Count       int32         `protobuf:"varint,4,opt,name=count,proto3" json:"count,omitempty"`
	Extra       *Extra        `protobuf:"bytes,5,opt,name=extra,proto3" json:"extra,omitempty"`
	Tags        []string      `protobuf:"bytes,6,rep,name=tags,proto3" json:"tags,omitempty"`
	Nest        *Example_Nest `protobuf:"bytes,7,opt,name=nest,proto3" json:"nest,omitempty"`
	// enum
	Clean    Cleanliness      `protobuf:"varint,8,opt,name=clean,proto3,enum=tutorial.Cleanliness" json:"clean,omitempty"`
	BirdNest Example_BirdNest `protobuf:"varint,9,opt,name=bird_nest,json=birdNest,proto3,enum=tutorial.Example_BirdNest" json:"bird_nest,omitempty"`
	// message with oneof
	Os *OperatingSystem `protobuf:"bytes,10,opt,name=os,proto3" json:"os,omitempty"`
	// Types that are assignable to Tree:
	//
	//	*Example_TreeType
	//	*Example_Bush
	Tree isExample_Tree `protobuf_oneof:"tree"`
}

func (x *Example) Reset() {
	*x = Example{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Example) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Example) ProtoMessage() {}

func (x *Example) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Example.ProtoReflect.Descriptor instead.
func (*Example) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{0}
}

func (x *Example) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Example) GetDisplayName() string {
	if x != nil {
		return x.DisplayName
	}
	return ""
}

func (x *Example) GetActive() bool {
	if x != nil {
		return x.Active
	}
	return false
}

func (x *Example) GetCount() int32 {
	if x != nil {
		return x.Count
	}
	return 0
}

func (x *Example) GetExtra() *Extra {
	if x != nil {
		return x.Extra
	}
	return nil
}

func (x *Example) GetTags() []string {
	if x != nil {
		return x.Tags
	}
	return nil
}

func (x *Example) GetNest() *Example_Nest {
	if x != nil {
		return x.Nest
	}
	return nil
}

func (x *Example) GetClean() Cleanliness {
	if x != nil {
		return x.Clean
	}
	return Cleanliness_CLEANLINESS_UNSPECIFIED
}

func (x *Example) GetBirdNest() Example_BirdNest {
	if x != nil {
		return x.BirdNest
	}
	return Example_BIRD_NEST_UNDEFINED
}

func (x *Example) GetOs() *OperatingSystem {
	if x != nil {
		return x.Os
	}
	return nil
}

func (m *Example) GetTree() isExample_Tree {
	if m != nil {
		return m.Tree
	}
	return nil
}

func (x *Example) GetTreeType() string {
	if x, ok := x.GetTree().(*Example_TreeType); ok {
		return x.TreeType
	}
	return ""
}

func (x *Example) GetBush() bool {
	if x, ok := x.GetTree().(*Example_Bush); ok {
		return x.Bush
	}
	return false
}

type isExample_Tree interface {
	isExample_Tree()
}

type Example_TreeType struct {
	TreeType string `protobuf:"bytes,11,opt,name=tree_type,json=treeType,proto3,oneof"`
}

type Example_Bush struct {
	Bush bool `protobuf:"varint,12,opt,name=bush,proto3,oneof"`
}

func (*Example_TreeType) isExample_Tree() {}

func (*Example_Bush) isExample_Tree() {}

type Extra struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	More string `protobuf:"bytes,1,opt,name=more,proto3" json:"more,omitempty"`
}

func (x *Extra) Reset() {
	*x = Extra{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Extra) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Extra) ProtoMessage() {}

func (x *Extra) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Extra.ProtoReflect.Descriptor instead.
func (*Extra) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{1}
}

func (x *Extra) GetMore() string {
	if x != nil {
		return x.More
	}
	return ""
}

type GetExampleRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *GetExampleRequest) Reset() {
	*x = GetExampleRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetExampleRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetExampleRequest) ProtoMessage() {}

func (x *GetExampleRequest) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetExampleRequest.ProtoReflect.Descriptor instead.
func (*GetExampleRequest) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{2}
}

func (x *GetExampleRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

// external oneof with nested message
type OperatingSystem struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to OperatingSystem:
	//
	//	*OperatingSystem_WindowsVersion
	//	*OperatingSystem_MacVersion
	//	*OperatingSystem_LinuxInfo_
	OperatingSystem isOperatingSystem_OperatingSystem `protobuf_oneof:"operating_system"`
}

func (x *OperatingSystem) Reset() {
	*x = OperatingSystem{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *OperatingSystem) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OperatingSystem) ProtoMessage() {}

func (x *OperatingSystem) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OperatingSystem.ProtoReflect.Descriptor instead.
func (*OperatingSystem) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{3}
}

func (m *OperatingSystem) GetOperatingSystem() isOperatingSystem_OperatingSystem {
	if m != nil {
		return m.OperatingSystem
	}
	return nil
}

func (x *OperatingSystem) GetWindowsVersion() int32 {
	if x, ok := x.GetOperatingSystem().(*OperatingSystem_WindowsVersion); ok {
		return x.WindowsVersion
	}
	return 0
}

func (x *OperatingSystem) GetMacVersion() string {
	if x, ok := x.GetOperatingSystem().(*OperatingSystem_MacVersion); ok {
		return x.MacVersion
	}
	return ""
}

func (x *OperatingSystem) GetLinuxInfo() *OperatingSystem_LinuxInfo {
	if x, ok := x.GetOperatingSystem().(*OperatingSystem_LinuxInfo_); ok {
		return x.LinuxInfo
	}
	return nil
}

type isOperatingSystem_OperatingSystem interface {
	isOperatingSystem_OperatingSystem()
}

type OperatingSystem_WindowsVersion struct {
	WindowsVersion int32 `protobuf:"varint,1,opt,name=windows_version,json=windowsVersion,proto3,oneof"`
}

type OperatingSystem_MacVersion struct {
	MacVersion string `protobuf:"bytes,2,opt,name=mac_version,json=macVersion,proto3,oneof"`
}

type OperatingSystem_LinuxInfo_ struct {
	LinuxInfo *OperatingSystem_LinuxInfo `protobuf:"bytes,3,opt,name=linux_info,json=linuxInfo,proto3,oneof"`
}

func (*OperatingSystem_WindowsVersion) isOperatingSystem_OperatingSystem() {}

func (*OperatingSystem_MacVersion) isOperatingSystem_OperatingSystem() {}

func (*OperatingSystem_LinuxInfo_) isOperatingSystem_OperatingSystem() {}

// embedded message
type Example_Nest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Info string `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
}

func (x *Example_Nest) Reset() {
	*x = Example_Nest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Example_Nest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Example_Nest) ProtoMessage() {}

func (x *Example_Nest) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Example_Nest.ProtoReflect.Descriptor instead.
func (*Example_Nest) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{0, 0}
}

func (x *Example_Nest) GetInfo() string {
	if x != nil {
		return x.Info
	}
	return ""
}

type OperatingSystem_LinuxInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Distro string `protobuf:"bytes,1,opt,name=distro,proto3" json:"distro,omitempty"`
	Arch   bool   `protobuf:"varint,2,opt,name=arch,proto3" json:"arch,omitempty"`
}

func (x *OperatingSystem_LinuxInfo) Reset() {
	*x = OperatingSystem_LinuxInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_example_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *OperatingSystem_LinuxInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OperatingSystem_LinuxInfo) ProtoMessage() {}

func (x *OperatingSystem_LinuxInfo) ProtoReflect() protoreflect.Message {
	mi := &file_example_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OperatingSystem_LinuxInfo.ProtoReflect.Descriptor instead.
func (*OperatingSystem_LinuxInfo) Descriptor() ([]byte, []int) {
	return file_example_proto_rawDescGZIP(), []int{3, 0}
}

func (x *OperatingSystem_LinuxInfo) GetDistro() string {
	if x != nil {
		return x.Distro
	}
	return ""
}

func (x *OperatingSystem_LinuxInfo) GetArch() bool {
	if x != nil {
		return x.Arch
	}
	return false
}

var File_example_proto protoreflect.FileDescriptor

var file_example_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x65, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12,
	0x08, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x22, 0x92, 0x04, 0x0a, 0x07, 0x45, 0x78,
	0x61, 0x6d, 0x70, 0x6c, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x21, 0x0a, 0x0c, 0x64, 0x69, 0x73,
	0x70, 0x6c, 0x61, 0x79, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x16, 0x0a, 0x06,
	0x61, 0x63, 0x74, 0x69, 0x76, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x61, 0x63,
	0x74, 0x69, 0x76, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x05, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x12, 0x25, 0x0a, 0x05, 0x65, 0x78,
	0x74, 0x72, 0x61, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x74, 0x75, 0x74, 0x6f,
	0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45, 0x78, 0x74, 0x72, 0x61, 0x52, 0x05, 0x65, 0x78, 0x74, 0x72,
	0x61, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x61, 0x67, 0x73, 0x18, 0x06, 0x20, 0x03, 0x28, 0x09, 0x52,
	0x04, 0x74, 0x61, 0x67, 0x73, 0x12, 0x2a, 0x0a, 0x04, 0x6e, 0x65, 0x73, 0x74, 0x18, 0x07, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45,
	0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x4e, 0x65, 0x73, 0x74, 0x52, 0x04, 0x6e, 0x65, 0x73,
	0x74, 0x12, 0x2b, 0x0a, 0x05, 0x63, 0x6c, 0x65, 0x61, 0x6e, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0e,
	0x32, 0x15, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x43, 0x6c, 0x65, 0x61,
	0x6e, 0x6c, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x52, 0x05, 0x63, 0x6c, 0x65, 0x61, 0x6e, 0x12, 0x37,
	0x0a, 0x09, 0x62, 0x69, 0x72, 0x64, 0x5f, 0x6e, 0x65, 0x73, 0x74, 0x18, 0x09, 0x20, 0x01, 0x28,
	0x0e, 0x32, 0x1a, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45, 0x78, 0x61,
	0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x42, 0x69, 0x72, 0x64, 0x4e, 0x65, 0x73, 0x74, 0x52, 0x08, 0x62,
	0x69, 0x72, 0x64, 0x4e, 0x65, 0x73, 0x74, 0x12, 0x29, 0x0a, 0x02, 0x6f, 0x73, 0x18, 0x0a, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x4f,
	0x70, 0x65, 0x72, 0x61, 0x74, 0x69, 0x6e, 0x67, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x52, 0x02,
	0x6f, 0x73, 0x12, 0x1d, 0x0a, 0x09, 0x74, 0x72, 0x65, 0x65, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18,
	0x0b, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x08, 0x74, 0x72, 0x65, 0x65, 0x54, 0x79, 0x70,
	0x65, 0x12, 0x14, 0x0a, 0x04, 0x62, 0x75, 0x73, 0x68, 0x18, 0x0c, 0x20, 0x01, 0x28, 0x08, 0x48,
	0x00, 0x52, 0x04, 0x62, 0x75, 0x73, 0x68, 0x1a, 0x1a, 0x0a, 0x04, 0x4e, 0x65, 0x73, 0x74, 0x12,
	0x12, 0x0a, 0x04, 0x69, 0x6e, 0x66, 0x6f, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x69,
	0x6e, 0x66, 0x6f, 0x22, 0x51, 0x0a, 0x08, 0x42, 0x69, 0x72, 0x64, 0x4e, 0x65, 0x73, 0x74, 0x12,
	0x17, 0x0a, 0x13, 0x42, 0x49, 0x52, 0x44, 0x5f, 0x4e, 0x45, 0x53, 0x54, 0x5f, 0x55, 0x4e, 0x44,
	0x45, 0x46, 0x49, 0x4e, 0x45, 0x44, 0x10, 0x00, 0x12, 0x17, 0x0a, 0x13, 0x42, 0x49, 0x52, 0x44,
	0x5f, 0x4e, 0x45, 0x53, 0x54, 0x5f, 0x44, 0x45, 0x53, 0x54, 0x52, 0x4f, 0x59, 0x45, 0x44, 0x10,
	0x01, 0x12, 0x13, 0x0a, 0x0f, 0x42, 0x49, 0x52, 0x44, 0x5f, 0x4e, 0x45, 0x53, 0x54, 0x5f, 0x42,
	0x55, 0x49, 0x4c, 0x54, 0x10, 0x02, 0x42, 0x06, 0x0a, 0x04, 0x74, 0x72, 0x65, 0x65, 0x22, 0x1b,
	0x0a, 0x05, 0x45, 0x78, 0x74, 0x72, 0x61, 0x12, 0x12, 0x0a, 0x04, 0x6d, 0x6f, 0x72, 0x65, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6d, 0x6f, 0x72, 0x65, 0x22, 0x27, 0x0a, 0x11, 0x47,
	0x65, 0x74, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x6e, 0x61, 0x6d, 0x65, 0x22, 0xf2, 0x01, 0x0a, 0x0f, 0x4f, 0x70, 0x65, 0x72, 0x61, 0x74, 0x69,
	0x6e, 0x67, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x12, 0x29, 0x0a, 0x0f, 0x77, 0x69, 0x6e, 0x64,
	0x6f, 0x77, 0x73, 0x5f, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x48, 0x00, 0x52, 0x0e, 0x77, 0x69, 0x6e, 0x64, 0x6f, 0x77, 0x73, 0x56, 0x65, 0x72, 0x73,
	0x69, 0x6f, 0x6e, 0x12, 0x21, 0x0a, 0x0b, 0x6d, 0x61, 0x63, 0x5f, 0x76, 0x65, 0x72, 0x73, 0x69,
	0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x0a, 0x6d, 0x61, 0x63, 0x56,
	0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x12, 0x44, 0x0a, 0x0a, 0x6c, 0x69, 0x6e, 0x75, 0x78, 0x5f,
	0x69, 0x6e, 0x66, 0x6f, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x23, 0x2e, 0x74, 0x75, 0x74,
	0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x4f, 0x70, 0x65, 0x72, 0x61, 0x74, 0x69, 0x6e, 0x67, 0x53,
	0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x4c, 0x69, 0x6e, 0x75, 0x78, 0x49, 0x6e, 0x66, 0x6f, 0x48,
	0x00, 0x52, 0x09, 0x6c, 0x69, 0x6e, 0x75, 0x78, 0x49, 0x6e, 0x66, 0x6f, 0x1a, 0x37, 0x0a, 0x09,
	0x4c, 0x69, 0x6e, 0x75, 0x78, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x16, 0x0a, 0x06, 0x64, 0x69, 0x73,
	0x74, 0x72, 0x6f, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x64, 0x69, 0x73, 0x74, 0x72,
	0x6f, 0x12, 0x12, 0x0a, 0x04, 0x61, 0x72, 0x63, 0x68, 0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x04, 0x61, 0x72, 0x63, 0x68, 0x42, 0x12, 0x0a, 0x10, 0x6f, 0x70, 0x65, 0x72, 0x61, 0x74, 0x69,
	0x6e, 0x67, 0x5f, 0x73, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2a, 0x8c, 0x01, 0x0a, 0x0b, 0x43, 0x6c,
	0x65, 0x61, 0x6e, 0x6c, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x12, 0x1b, 0x0a, 0x17, 0x43, 0x4c, 0x45,
	0x41, 0x4e, 0x4c, 0x49, 0x4e, 0x45, 0x53, 0x53, 0x5f, 0x55, 0x4e, 0x53, 0x50, 0x45, 0x43, 0x49,
	0x46, 0x49, 0x45, 0x44, 0x10, 0x00, 0x12, 0x1a, 0x0a, 0x16, 0x43, 0x4c, 0x45, 0x41, 0x4e, 0x4c,
	0x49, 0x4e, 0x45, 0x53, 0x53, 0x5f, 0x44, 0x49, 0x53, 0x47, 0x55, 0x53, 0x54, 0x49, 0x4e, 0x47,
	0x10, 0x01, 0x12, 0x13, 0x0a, 0x0f, 0x43, 0x4c, 0x45, 0x41, 0x4e, 0x4c, 0x49, 0x4e, 0x45, 0x53,
	0x53, 0x5f, 0x42, 0x41, 0x44, 0x10, 0x02, 0x12, 0x14, 0x0a, 0x10, 0x43, 0x4c, 0x45, 0x41, 0x4e,
	0x4c, 0x49, 0x4e, 0x45, 0x53, 0x53, 0x5f, 0x47, 0x4f, 0x4f, 0x44, 0x10, 0x03, 0x12, 0x19, 0x0a,
	0x15, 0x43, 0x4c, 0x45, 0x41, 0x4e, 0x4c, 0x49, 0x4e, 0x45, 0x53, 0x53, 0x5f, 0x45, 0x58, 0x43,
	0x45, 0x4c, 0x4c, 0x45, 0x4e, 0x54, 0x10, 0x04, 0x32, 0x85, 0x01, 0x0a, 0x0e, 0x45, 0x78, 0x61,
	0x6d, 0x70, 0x6c, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x35, 0x0a, 0x0d, 0x43,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x12, 0x11, 0x2e, 0x74,
	0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x1a,
	0x11, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45, 0x78, 0x61, 0x6d, 0x70,
	0x6c, 0x65, 0x12, 0x3c, 0x0a, 0x0a, 0x47, 0x65, 0x74, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65,
	0x12, 0x1b, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x47, 0x65, 0x74, 0x45,
	0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x11, 0x2e,
	0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x2e, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65,
	0x42, 0x8a, 0x01, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e, 0x74, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61,
	0x6c, 0x42, 0x0c, 0x45, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50,
	0x01, 0x5a, 0x2c, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6c, 0x63,
	0x6d, 0x61, 0x67, 0x75, 0x69, 0x72, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67,
	0x65, 0x6e, 0x2d, 0x73, 0x76, 0x65, 0x6c, 0x74, 0x65, 0x2f, 0x6d, 0x6f, 0x63, 0x6b, 0x73, 0xa2,
	0x02, 0x03, 0x54, 0x58, 0x58, 0xaa, 0x02, 0x08, 0x54, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c,
	0xca, 0x02, 0x08, 0x54, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0xe2, 0x02, 0x14, 0x54, 0x75,
	0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61,
	0x74, 0x61, 0xea, 0x02, 0x08, 0x54, 0x75, 0x74, 0x6f, 0x72, 0x69, 0x61, 0x6c, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_example_proto_rawDescOnce sync.Once
	file_example_proto_rawDescData = file_example_proto_rawDesc
)

func file_example_proto_rawDescGZIP() []byte {
	file_example_proto_rawDescOnce.Do(func() {
		file_example_proto_rawDescData = protoimpl.X.CompressGZIP(file_example_proto_rawDescData)
	})
	return file_example_proto_rawDescData
}

var file_example_proto_enumTypes = make([]protoimpl.EnumInfo, 2)
var file_example_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_example_proto_goTypes = []interface{}{
	(Cleanliness)(0),                  // 0: tutorial.Cleanliness
	(Example_BirdNest)(0),             // 1: tutorial.Example.BirdNest
	(*Example)(nil),                   // 2: tutorial.Example
	(*Extra)(nil),                     // 3: tutorial.Extra
	(*GetExampleRequest)(nil),         // 4: tutorial.GetExampleRequest
	(*OperatingSystem)(nil),           // 5: tutorial.OperatingSystem
	(*Example_Nest)(nil),              // 6: tutorial.Example.Nest
	(*OperatingSystem_LinuxInfo)(nil), // 7: tutorial.OperatingSystem.LinuxInfo
}
var file_example_proto_depIdxs = []int32{
	3, // 0: tutorial.Example.extra:type_name -> tutorial.Extra
	6, // 1: tutorial.Example.nest:type_name -> tutorial.Example.Nest
	0, // 2: tutorial.Example.clean:type_name -> tutorial.Cleanliness
	1, // 3: tutorial.Example.bird_nest:type_name -> tutorial.Example.BirdNest
	5, // 4: tutorial.Example.os:type_name -> tutorial.OperatingSystem
	7, // 5: tutorial.OperatingSystem.linux_info:type_name -> tutorial.OperatingSystem.LinuxInfo
	2, // 6: tutorial.ExampleService.CreateExample:input_type -> tutorial.Example
	4, // 7: tutorial.ExampleService.GetExample:input_type -> tutorial.GetExampleRequest
	2, // 8: tutorial.ExampleService.CreateExample:output_type -> tutorial.Example
	2, // 9: tutorial.ExampleService.GetExample:output_type -> tutorial.Example
	8, // [8:10] is the sub-list for method output_type
	6, // [6:8] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_example_proto_init() }
func file_example_proto_init() {
	if File_example_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_example_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Example); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_example_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Extra); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_example_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetExampleRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_example_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*OperatingSystem); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_example_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Example_Nest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_example_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*OperatingSystem_LinuxInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_example_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*Example_TreeType)(nil),
		(*Example_Bush)(nil),
	}
	file_example_proto_msgTypes[3].OneofWrappers = []interface{}{
		(*OperatingSystem_WindowsVersion)(nil),
		(*OperatingSystem_MacVersion)(nil),
		(*OperatingSystem_LinuxInfo_)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_example_proto_rawDesc,
			NumEnums:      2,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_example_proto_goTypes,
		DependencyIndexes: file_example_proto_depIdxs,
		EnumInfos:         file_example_proto_enumTypes,
		MessageInfos:      file_example_proto_msgTypes,
	}.Build()
	File_example_proto = out.File
	file_example_proto_rawDesc = nil
	file_example_proto_goTypes = nil
	file_example_proto_depIdxs = nil
}
