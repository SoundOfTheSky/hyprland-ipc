[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / HyprlandWorkspace

# Class: HyprlandWorkspace

Defined in: [workspace.ts:6](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/workspace.ts#L6)

Wrapper around a Hyprland workspace object.

## Constructors

### Constructor

> **new HyprlandWorkspace**(`hyprland`, `data`): `HyprlandWorkspace`

Defined in: [workspace.ts:17](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/workspace.ts#L17)

Creates a workspace wrapper around Hyprland workspace data.

#### Parameters

##### hyprland

[`Hyprland`](Hyprland.md)

Client owning the workspace.

##### data

`HyprlandWorkspaceData`

Raw workspace data returned by Hyprland.

#### Returns

`HyprlandWorkspace`

#### Example

```ts
const workspace = new HyprlandWorkspace(client, { id: 1 } as any)
```

## Properties

### data

> **data**: `HyprlandWorkspaceData`

Defined in: [workspace.ts:19](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/workspace.ts#L19)

Raw workspace data returned by Hyprland.

## Accessors

### windows

#### Get Signature

> **get** **windows**(): [`HyprlandWindow`](HyprlandWindow.md)[]

Defined in: [workspace.ts:45](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/workspace.ts#L45)

Returns the windows that belong to this workspace.

##### Example

```ts
const windows = workspace.windows
```

##### Returns

[`HyprlandWindow`](HyprlandWindow.md)[]

The windows currently assigned to the workspace.

## Methods

### focus()

> **focus**(): `Promise`\<`string`\>

Defined in: [workspace.ts:32](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/workspace.ts#L32)

Focuses the workspace.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await workspace.focus()
```
