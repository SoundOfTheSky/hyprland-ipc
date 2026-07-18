[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / HyprlandWindow

# Class: HyprlandWindow

Defined in: [window.ts:9](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L9)

Wrapper around a Hyprland window object.

## Constructors

### Constructor

> **new HyprlandWindow**(`hyprland`, `data`): `HyprlandWindow`

Defined in: [window.ts:20](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L20)

Creates a window wrapper around Hyprland window data.

#### Parameters

##### hyprland

[`Hyprland`](Hyprland.md)

Client owning the window.

##### data

`HyprlandWindowData`

Raw window data returned by Hyprland.

#### Returns

`HyprlandWindow`

#### Example

```ts
const window = new HyprlandWindow(client, { address: '0x1', workspace: { id: 1 } } as any)
```

## Properties

### data

> **data**: `HyprlandWindowData`

Defined in: [window.ts:22](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L22)

Raw window data returned by Hyprland.

## Accessors

### monitor

#### Get Signature

> **get** **monitor**(): [`HyprlandMonitor`](HyprlandMonitor.md) \| `undefined`

Defined in: [window.ts:47](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L47)

Returns the monitor that currently hosts this window.

##### Example

```ts
const monitor = window.monitor
```

##### Returns

[`HyprlandMonitor`](HyprlandMonitor.md) \| `undefined`

The monitor hosting the window, if known.

***

### workspace

#### Get Signature

> **get** **workspace**(): [`HyprlandWorkspace`](HyprlandWorkspace.md) \| `undefined`

Defined in: [window.ts:34](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L34)

Returns the workspace that currently owns this window.

##### Example

```ts
const workspace = window.workspace
```

##### Returns

[`HyprlandWorkspace`](HyprlandWorkspace.md) \| `undefined`

The workspace containing the window, if known.

## Methods

### alter\_zorder()

> **alter\_zorder**(`mode`): `Promise`\<`string`\>

Defined in: [window.ts:76](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L76)

Changes the window's z-order.

#### Parameters

##### mode

`"top"` \| `"bottom"`

Stack position to apply to the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.alter_zorder('top')
```

***

### bring\_to\_top()

> **bring\_to\_top**(): `Promise`\<`string`\>

Defined in: [window.ts:90](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L90)

Brings the window to the top of the stack.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.bring_to_top()
```

***

### center()

> **center**(): `Promise`\<`string`\>

Defined in: [window.ts:104](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L104)

Centers the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.center()
```

***

### clear\_tags()

> **clear\_tags**(): `Promise`\<`string`\>

Defined in: [window.ts:118](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L118)

Clears all tags from the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.clear_tags()
```

***

### close()

> **close**(): `Promise`\<`string`\>

Defined in: [window.ts:132](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L132)

Closes the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.close()
```

***

### cycle\_next()

> **cycle\_next**(`data?`): `Promise`\<`string`\>

Defined in: [window.ts:146](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L146)

Cycles through windows in the given direction or mode.

#### Parameters

##### data?

Optional cycle options.

###### floating?

`boolean`

###### next?

`boolean`

###### tiled?

`boolean`

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.cycle_next({ next: true })
```

***

### deny\_from\_group()

> **deny\_from\_group**(): `Promise`\<`string`\>

Defined in: [window.ts:164](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L164)

Removes the window from its current group.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.deny_from_group()
```

***

### drag()

> **drag**(): `Promise`\<`string`\>

Defined in: [window.ts:178](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L178)

Starts dragging the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.drag()
```

***

### dsp()

> `protected` **dsp**(`name`, `data?`): `Promise`\<`string`\>

Defined in: [window.ts:363](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L363)

Dispatches a window-specific Hyprland action.

#### Parameters

##### name

`string`

Action name to dispatch.

##### data?

`Record`\<`string`, `any`\> = `{}`

Payload sent with the action.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.dsp('focus')
```

***

### float()

> **float**(): `Promise`\<`string`\>

Defined in: [window.ts:192](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L192)

Floats the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.float()
```

***

### focus()

> **focus**(): `Promise`\<`string`\>

Defined in: [window.ts:62](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L62)

Focuses the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.focus()
```

***

### fullscreen()

> **fullscreen**(`mode`): `Promise`\<`string`\>

Defined in: [window.ts:206](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L206)

Toggles fullscreen state for the window.

#### Parameters

##### mode

`0` \| `1` \| `2`

Fullscreen mode to apply.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.fullscreen(1)
```

***

### kill()

> **kill**(): `Promise`\<`string`\>

Defined in: [window.ts:220](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L220)

Kills the window process.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.kill()
```

***

### move()

> **move**(`data`): `Promise`\<`string`\>

Defined in: [window.ts:234](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L234)

Moves the window to a new position, workspace, or monitor.

#### Parameters

##### data

\{ `direction?`: `Direction`; \} \| \{ `relative?`: `boolean`; `x`: `number`; `y`: `number`; \} \| \{ `follow?`: `boolean`; `monitor`: `number` \| [`HyprlandMonitor`](HyprlandMonitor.md); \} \| \{ `follow?`: `boolean`; `workspace`: `number` \| [`HyprlandWorkspace`](HyprlandWorkspace.md); \}

Movement target definition.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.move({ direction: 'left' })
```

***

### pin()

> **pin**(): `Promise`\<`string`\>

Defined in: [window.ts:254](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L254)

Pins the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.pin()
```

***

### pseudo()

> **pseudo**(): `Promise`\<`string`\>

Defined in: [window.ts:268](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L268)

Enables pseudo-tiling for the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.pseudo()
```

***

### resize()

> **resize**(`data?`): `Promise`\<`string`\>

Defined in: [window.ts:282](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L282)

Resizes the window.

#### Parameters

##### data?

\{ `keep_aspect_ratio`: `boolean`; \} \| \{ `relative?`: `boolean`; `x`: `number`; `y`: `number`; \}

Resize options for the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.resize({ x: 20, y: 20, relative: true })
```

***

### signal()

> **signal**(`signal`): `Promise`\<`string`\>

Defined in: [window.ts:300](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L300)

Sends a signal to the window.

#### Parameters

##### signal

`string`

Signal name to emit.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.signal('SIGTERM')
```

***

### swap()

> **swap**(`data`): `Promise`\<`string`\>

Defined in: [window.ts:314](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L314)

Swaps the window with another window or relative position.

#### Parameters

##### data

\{ `direction`: `Direction`; \} \| \{ `target`: `string` \| `HyprlandWindow`; \} \| \{ `next`: `boolean`; \} \| \{ `prev`: `boolean`; \}

Swap target description.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.swap({ next: true })
```

***

### tag()

> **tag**(`tag`): `Promise`\<`string`\>

Defined in: [window.ts:334](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L334)

Applies a tag to the window.

#### Parameters

##### tag

`string`

Tag name to assign.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.tag('work')
```

***

### toggle\_swallow()

> **toggle\_swallow**(): `Promise`\<`string`\>

Defined in: [window.ts:348](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/window.ts#L348)

Toggles swallow behavior for the window.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await window.toggle_swallow()
```
