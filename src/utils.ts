import { HyprlandMonitor } from './monitor'
import { HyprlandWindow } from './window'
import { HyprlandWorkspace } from './workspace'

export function toLua(value: unknown): string {
  if (value === null || value === undefined) return 'nil'
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

export function changeHyprlandObjectsToIds(data: Record<string, unknown>) {
  for (const key in data) {
    if (data[key] instanceof HyprlandMonitor) data[key] = data[key].data.id
    else if (data[key] instanceof HyprlandWorkspace)
      data[key] = data[key].data.id
    else if (data[key] instanceof HyprlandWindow)
      data[key] = `address:${data[key].data.address}`
  }
  return data
}
