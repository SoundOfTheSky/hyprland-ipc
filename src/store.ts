import { Hyprland } from './hyprland'

export class Store<
  DATA,
  T extends { data: DATA },
  KEY extends keyof T['data'],
> {
  public list: T[] = []
  protected map = new Map<T['data'][KEY], T>()

  /**
   * Creates a store bound to a Hyprland client.
   *
   * @param hyprland Client instance owning the store.
   * @param ctr Constructor used to create wrapped entries.
   * @param key Property name used as the unique key.
   * @example
   * ```ts
   * const windows = new Store(client, HyprlandWindow, 'address')
   * ```
   */
  public constructor(
    protected hyprland: Hyprland,
    protected ctr: new (hyprland: Hyprland, data: DATA) => T,
    protected key: KEY,
  ) {}

  /**
   * Looks up a stored item by its key.
   *
   * @param key Unique identifier for the entry.
   * @returns The matching entry or undefined.
   * @example
   * ```ts
   * const window = client.windows.get('0xabc')
   * ```
   */
  public get(key: T['data'][KEY]) {
    return this.map.get(key)
  }

  /**
   * Finds the first entry matching a property query.
   *
   * @param query Query in the form property:regexp.
   * @returns The first matching entry or undefined.
   * @example
   * ```ts
   * const match = client.windows.find('class:^Firefox$')
   * ```
   */
  public find(query: string) {
    return this.list.find(this.buildQuery(query))
  }

  /**
   * Filters entries by a property query.
   *
   * @param query Query in the form property:regexp.
   * @returns All matching entries.
   * @example
   * ```ts
   * const matches = client.windows.filter('title:[Vv]im')
   * ```
   */
  public filter(query: string) {
    return this.list.filter(this.buildQuery(query))
  }

  /**
   * Replaces the store contents with a fresh list of data.
   *
   * @param dataList New entries to sync into the store.
   * @returns Nothing.
   * @example
   * ```ts
   * client.windows.updateList([{ address: '0x1', ... } as any])
   * ```
   */
  public updateList(dataList: DATA[]) {
    const unused = new Set(this.map.keys())
    for (const data of dataList) {
      const keyValue = data[this.key]
      unused.delete(keyValue)
      const existing = this.map.get(keyValue)
      if (existing) existing.data = data
      else {
        const n = new this.ctr(this.hyprland, data)
        this.list.push(n)
        this.map.set(keyValue, n)
      }
    }
    for (const key of unused) this.delete(key)
  }

  /**
   * Inserts a new entry or updates an existing one in place.
   *
   * @param data New data for the entry.
   * @returns The created or updated wrapper instance.
   * @example
   * ```ts
   * const entry = client.windows.upsert({ address: '0x2', ... } as any)
   * ```
   */
  public upsert(data: DATA) {
    const keyValue = data[this.key]
    const existing = this.map.get(keyValue)
    if (existing) {
      existing.data = data
      return existing
    }
    const n = new this.ctr(this.hyprland, data)
    this.list.push(n)
    this.map.set(keyValue, n)
    return n
  }

  /**
   * Deletes an entry from the store.
   *
   * @param key Unique identifier for the entry.
   * @returns Nothing.
   * @example
   * ```ts
   * client.windows.delete('0xabc')
   * ```
   */
  public delete(key: T['data'][KEY]) {
    this.map.delete(key)
    this.list.splice(
      this.list.findIndex((x) => x.data[this.key] === key),
      1,
    )
  }

  public active: T | undefined

  /**
   * Builds a predicate from a property query.
   *
   * @param query Query string describing the property and regexp.
   * @returns A predicate function for filtering items.
   * @example
   * ```ts
   * const predicate = store.buildQuery('class:^Firefox$')
   * ```
   */
  protected buildQuery(query: string) {
    const semiIndex = query.indexOf(':')
    if (semiIndex === -1)
      throw new Error(`Wrong query "${query}". Example: "class:^[Ss]team$"`)
    const property = query.slice(0, semiIndex) as keyof DATA
    const regexp = new RegExp(query.slice(semiIndex + 1))
    return (x: T) => regexp.test(x.data[property] + '')
  }
}
