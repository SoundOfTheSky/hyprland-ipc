import net from 'node:net'
import { join } from 'node:path'
import { env } from 'node:process'

import { AnyFunction } from '@softsky/utils'

import { HyprlandIPCEventsMap } from './events'

if (!env.XDG_RUNTIME_DIR) throw new Error('XDG_RUNTIME_DIR is not set')
if (!env.HYPRLAND_INSTANCE_SIGNATURE)
  throw new Error('HYPRLAND_INSTANCE_SIGNATURE is not set')
const SOCKET_DIR = join(
  env.XDG_RUNTIME_DIR,
  'hypr',
  env.HYPRLAND_INSTANCE_SIGNATURE,
)
const REQUEST_SOCKET = join(SOCKET_DIR, '.socket.sock')
const EVENT_SOCKET = join(SOCKET_DIR, '.socket2.sock')

export class HyprlandIPC {
  private eventSocket: net.Socket | undefined
  private subscribers = new Map<string, Set<AnyFunction>>()

  public startListening(tryNumber = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stopListening()
      this.eventSocket = net.createConnection(EVENT_SOCKET)
      this.eventSocket.on('connect', () => {
        resolve()
      })
      this.eventSocket.on('error', () => {
        reject(new Error('Failed to connect to event socket'))
        this.eventSocket = undefined
      })
      this.eventSocket.on('end', () => {
        if (this.subscribers.size > 0 && tryNumber < 5)
          setTimeout(() => void this.startListening(tryNumber + 1), 1000)
        else this.eventSocket = undefined
      })
      this.eventSocket.on('data', (chunk) => {
        for (const data of chunk.toString().split('\n')) {
          const [event, argumentsData] = data.split('>>')
          if (!argumentsData) continue
          const args = argumentsData.split(',')
          const subscribers = this.subscribers.get(event)
          if (!subscribers) continue
          for (const subscriber of subscribers) {
            try {
              subscriber(...args)
            } catch (error) {
              console.error(`Error in subscriber for event "${event}":`, error)
            }
          }
        }
      })
    })
  }

  public stopListening(): void {
    this.eventSocket?.destroy()
    this.eventSocket = undefined
  }

  public on<T extends keyof HyprlandIPCEventsMap>(
    event: T,
    callback: (...args: HyprlandIPCEventsMap[T]) => void,
  ): void {
    if (!this.eventSocket) void this.startListening()
    let subscribers = this.subscribers.get(event)
    if (!subscribers) {
      subscribers = new Set()
      this.subscribers.set(event, subscribers)
    }
    subscribers.add(callback)
  }

  public off<T extends keyof HyprlandIPCEventsMap>(
    event: T,
    callback: (...args: HyprlandIPCEventsMap[T]) => void,
  ): void {
    const subscribers = this.subscribers.get(event)
    if (!subscribers) return
    subscribers.delete(callback)
    if (subscribers.size === 0) this.subscribers.delete(event)
    if (this.subscribers.size === 0) this.stopListening()
  }

  public send(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const socket = net.createConnection(REQUEST_SOCKET)
      let response = ''
      socket.on('connect', () => {
        socket.write(cmd)
      })
      socket.on('data', (chunk) => {
        response += chunk.toString()
        socket.end()
      })
      socket.on('end', () => {
        resolve(response)
      })
      socket.on('error', reject)
    })
  }
}
