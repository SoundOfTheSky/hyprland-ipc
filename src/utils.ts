import { HyprlandMonitor } from './monitor'
import { HyprlandWindow } from './window'
import { HyprlandWorkspace } from './workspace'

/**
 * Converts a JavaScript value into a Lua-compatible string.
 *
 * @param value Value to serialize for Hyprland.
 * @returns A string representation that Hyprland can consume.
 * @example
 * ```ts
 * toLua({ foo: 'bar' })
 * // => '{ ["foo"] = "bar" }'
 * ```
 */
export function toLua(value: unknown): string {
  if (value === null || value === undefined) return 'nil'
  if (value instanceof HyprlandMonitor) return String(value.data.id)
  else if (value instanceof HyprlandWorkspace) return String(value.data.id)
  else if (value instanceof HyprlandWindow)
    return JSON.stringify(`address:${value.data.address}`)
  switch (typeof value) {
    case 'boolean':
      return value ? 'true' : 'false'
    case 'number':
      if (!Number.isFinite(value))
        throw new Error(`Cannot serialize ${value} to Lua`)
      return String(value)
    case 'bigint':
      return value.toString()
    case 'string':
      return JSON.stringify(value)
    case 'object':
      if (value instanceof Date) return JSON.stringify(value.toISOString())
      if (value instanceof RegExp) return JSON.stringify(value.toString())
      if (Array.isArray(value)) return `{ ${value.map(toLua).join(', ')} }`
      return `{ ${Object.entries(value)
        .map(([key, value]) => `[${JSON.stringify(key)}] = ${toLua(value)}`)
        .join(', ')} }`
    default:
      throw new Error(`Cannot serialize ${typeof value} to Lua`)
  }
}
