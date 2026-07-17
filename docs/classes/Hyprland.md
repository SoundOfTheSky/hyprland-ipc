[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / Hyprland

# Class: Hyprland\<EVENTS\>

Defined in: [hyprland.ts:21](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L21)

## Type Parameters

### EVENTS

`EVENTS` *extends* `Record`\<`string`, `string`[]\> = `Record`\<`never`, `never`[]\>

## Constructors

### Constructor

> **new Hyprland**\<`EVENTS`\>(`options?`): `Hyprland`\<`EVENTS`\>

Defined in: [hyprland.ts:39](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L39)

Creates a Hyprland client and optionally enables live cache updates.

#### Parameters

##### options?

Optional runtime settings for the client.

###### autoUpdate?

`boolean`

Update data automatically on events. CPU extensive

#### Returns

`Hyprland`\<`EVENTS`\>

#### Example

```ts
const client = new Hyprland({ autoUpdate: true })
```

## Properties

### ipc

> `protected` **ipc**: `HyprlandIPC`\<`EVENTS`\>

Defined in: [hyprland.ts:28](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L28)

***

### monitors

> **monitors**: `Store`\<`HyprlandMonitorData`, [`HyprlandMonitor`](HyprlandMonitor.md), `"id"`\>

Defined in: [hyprland.ts:26](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L26)

***

### windows

> **windows**: `Store`\<`HyprlandWindowData`, [`HyprlandWindow`](HyprlandWindow.md), `"address"`\>

Defined in: [hyprland.ts:24](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L24)

***

### workspaces

> **workspaces**: `Store`\<`HyprlandWorkspaceData`, [`HyprlandWorkspace`](HyprlandWorkspace.md), `"id"`\>

Defined in: [hyprland.ts:25](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L25)

## Methods

### bind()

> **bind**(`bind`, `callback`): `Promise`\<() => `boolean`\>

Defined in: [hyprland.ts:289](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L289)

Registers a keybind that dispatches a callback through the IPC bridge.

#### Parameters

##### bind

`string`[]

Key chord to register.

##### callback

`AnyFunction`

Function invoked when the keybind triggers.

#### Returns

`Promise`\<() => `boolean`\>

A promise resolving to an unsubscribe function.

#### Example

```ts
const stop = await client.bind(['SUPER', 'Return'], () => console.log('opened'))
stop()
```

***

### config()

> **config**(`config`): `Promise`\<`string`\>

Defined in: [hyprland.ts:273](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L273)

Applies a Hyprland configuration block.

#### Parameters

##### config

`HyprlandConfig`

Configuration object to apply.

#### Returns

`Promise`\<`string`\>

A promise resolving to Hyprland's response.

#### Example

```ts
await client.config({ general: { border_size: 2 } })
```

***

### dispatch()

> **dispatch**(`name`, `data`): `Promise`\<`string`\>

Defined in: [hyprland.ts:132](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L132)

Dispatches a Hyprland dispatcher action.

#### Parameters

##### name

`string`

Dispatcher name to invoke.

##### data

`unknown`

Payload passed to the dispatcher.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await client.dispatch('focus', { window: this.windows.find('class:^steam$') })
```

***

### eval()

> **eval**(`luaCode`): `Promise`\<`string`\>

Defined in: [hyprland.ts:117](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L117)

Evaluates raw Lua code through Hyprland's IPC interface.

#### Parameters

##### luaCode

`string`

Lua snippet to execute in Hyprland.

#### Returns

`Promise`\<`string`\>

A promise resolving to the command output.

#### Example

```ts
const result = await client.eval('return 42')
console.log(result)
```

***

### focus()

> **focus**(`data`): `Promise`\<`string`\>

Defined in: [hyprland.ts:307](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L307)

Moves focus in the Hyprland session.

#### Parameters

##### data

\{ `direction`: `Direction`; \} \| \{ `monitor`: `string` \| [`HyprlandMonitor`](HyprlandMonitor.md); \} \| \{ `on_current_monitor?`: `boolean`; `workspace`: `string` \| [`HyprlandWorkspace`](HyprlandWorkspace.md); \} \| \{ `window`: `string` \| [`HyprlandWindow`](HyprlandWindow.md); \} \| \{ `urgent_or_last`: `boolean`; \} \| \{ `last`: `boolean`; \}

Focus target descriptor.

#### Returns

`Promise`\<`string`\>

A promise resolving to the dispatcher response.

#### Example

```ts
await client.focus({ direction: 'left' })
```

***

### layerRule()

> **layerRule**(`rule`): `Promise`\<`string`\>

Defined in: [hyprland.ts:245](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L245)

Applies a layer rule through Hyprland.

#### Parameters

##### rule

`LayerRule`

Layer rule definition.

#### Returns

`Promise`\<`string`\>

A promise resolving to Hyprland's response.

#### Example

```ts
await client.layerRule({ match: { namespace: 'bar' }, blur: true })
```

***

### on()

> **on**\<`T`\>(`event`, `callback`): () => `boolean`

Defined in: [hyprland.ts:150](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L150)

Registers a callback for a Hyprland event.

#### Type Parameters

##### T

`T` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`T`

Event name to subscribe to.

##### callback

(...`args`) => `void`

Function invoked when the event fires.

#### Returns

An unsubscribe function.

() => `boolean`

#### Example

```ts
const unsubscribe = client.on('window.open', () => {
  console.log('window opened')
})
unsubscribe()
```

***

### updateAll()

> **updateAll**(): `Promise`\<`void`\>

Defined in: [hyprland.ts:213](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L213)

Refreshes windows, workspaces, and monitors together.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all caches are refreshed.

#### Example

```ts
await client.updateAll()
```

***

### updateMonitors()

> **updateMonitors**(): `Promise`\<`void`\>

Defined in: [hyprland.ts:198](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L198)

Refreshes the cached monitor list from Hyprland.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the cache is updated.

#### Example

```ts
await client.updateMonitors()
```

***

### updateWindows()

> **updateWindows**(): `Promise`\<`void`\>

Defined in: [hyprland.ts:166](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L166)

Refreshes the cached window list from Hyprland.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the cache is updated.

#### Example

```ts
await client.updateWindows()
```

***

### updateWorkspaces()

> **updateWorkspaces**(): `Promise`\<`void`\>

Defined in: [hyprland.ts:181](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L181)

Refreshes the cached workspace list from Hyprland.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the cache is updated.

#### Example

```ts
await client.updateWorkspaces()
```

***

### windowRule()

> **windowRule**(`rule`): `Promise`\<`string`\>

Defined in: [hyprland.ts:231](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L231)

Applies a window rule through Hyprland.

#### Parameters

##### rule

`WindowRule`

Rule definition describing the window behavior.

#### Returns

`Promise`\<`string`\>

A promise resolving to Hyprland's response.

#### Example

```ts
await client.windowRule({ match: { class: 'kitty' }, float: true })
```

***

### workspaceRule()

> **workspaceRule**(`rule`): `Promise`\<`string`\>

Defined in: [hyprland.ts:259](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/hyprland.ts#L259)

Applies a workspace rule through Hyprland.

#### Parameters

##### rule

`WorkspaceRule`

Workspace rule definition.

#### Returns

`Promise`\<`string`\>

A promise resolving to Hyprland's response.

#### Example

```ts
await client.workspaceRule({ workspace: '1', layout: 'dwindle' })
```
