// Copy for antfu/birpc

export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never
export type ReturnType<T> = T extends (...args: any) => infer R ? R : never
export type PromisifyFn<T> = ReturnType<T> extends Promise<any>
  ? T
  : (...args: ArgumentsType<T>) => Promise<Awaited<ReturnType<T>>>

export type BirpcResolver = (name: string, resolved: (...args: unknown[]) => unknown) => ((...args: unknown[]) => unknown) | undefined

export interface ChannelOptions {
  /**
   * Function to post raw message
   */
  post: (data: any, ...extras: any[]) => any | Promise<any>
  /**
   * Listener to receive raw message
   */
  on: (fn: (data: any, ...extras: any[]) => void) => any | Promise<any>
  /**
   * Custom function to serialize data
   *
   * by default it passes the data as-is
   */
  serialize?: (data: any) => any
  /**
   * Custom function to deserialize data
   *
   * by default it passes the data as-is
   */
  deserialize?: (data: any) => any
}

export interface EventOptions<Remote> {
  /**
   * Names of remote functions that do not need response.
   */
  eventNames?: (keyof Remote)[]

  /**
   * Maximum timeout for waiting for response, in milliseconds.
   *
   * @default 60_000
   */
  timeout?: number

  /**
   * Custom resolver to resolve function to be called
   *
   * For advanced use cases only
   */
  resolver?: BirpcResolver

  /**
   * Custom error handler
   */
  onError?: (error: Error, functionName: string, args: any[]) => boolean | void
}

export type BirpcOptions<Remote> = EventOptions<Remote> & ChannelOptions

export type BirpcFn<T> = PromisifyFn<T> & {
  /**
   * Send event without asking for response
   */
  asEvent(...args: ArgumentsType<T>): void
}

export interface BirpcGroupFn<T> {
  /**
   * Call the remote function and wait for the result.
   */
  (...args: ArgumentsType<T>): Promise<Awaited<ReturnType<T>>[]>
  /**
   * Send event without asking for response
   */
  asEvent(...args: ArgumentsType<T>): void
}

export type BirpcReturn<RemoteFunctions, LocalFunctions = Record<string, never>> = {
  [K in keyof RemoteFunctions]: BirpcFn<RemoteFunctions[K]>
} & { $functions: LocalFunctions }

export type BirpcGroupReturn<RemoteFunctions> = {
  [K in keyof RemoteFunctions]: BirpcGroupFn<RemoteFunctions[K]>
}

export interface BirpcGroup<RemoteFunctions, LocalFunctions = Record<string, never>> {
  readonly clients: BirpcReturn<RemoteFunctions, LocalFunctions>[]
  readonly functions: LocalFunctions
  readonly broadcast: BirpcGroupReturn<RemoteFunctions>
  updateChannels(fn?: ((channels: ChannelOptions[]) => void)): BirpcReturn<RemoteFunctions, LocalFunctions>[]
}

interface Request {
  /**
   * Type
   */
  t: 'q'
  /**
   * ID
   */
  i?: string
  /**
   * Method
   */
  m: string
  /**
   * Arguments
   */
  a: any[]
}

interface Response {
  /**
   * Type
   */
  t: 's'
  /**
   * Id
   */
  i: string
  /**
   * Result
   */
  r?: any
  /**
   * Error
   */
  e?: any
}

type RPCMessage = Request | Response

export const DEFAULT_TIMEOUT = 60_000 // 1 minute

function defaultSerialize(i: any) {
  return i
}
const defaultDeserialize = defaultSerialize

// Store public APIs locally in case they are overridden later
const { clearTimeout, setTimeout } = globalThis
const random = Math.random.bind(Math)

export function createBirpc<RemoteFunctions = Record<string, never>, LocalFunctions = Record<string, never>>(
  functions: LocalFunctions,
  options: BirpcOptions<RemoteFunctions>,
): BirpcReturn<RemoteFunctions, LocalFunctions> {
  const {
    post,
    on,
    eventNames = [],
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    resolver,
    timeout = DEFAULT_TIMEOUT,
  } = options

  const rpcPromiseMap = new Map<string, { resolve: (arg: any) => void, reject: (error: any) => void, timeoutId: Parameters<typeof clearTimeout>[0] }>()

  let _promise: Promise<any> | any

  const rpc = new Proxy({}, {
    get(_, method: string) {
      if (method === '$functions')
        return functions

      const sendEvent = (...args: any[]) => {
        post(serialize(<Request>{ m: method, a: args, t: 'q' }))
      }
      if (eventNames.includes(method as any)) {
        sendEvent.asEvent = sendEvent
        return sendEvent
      }
      const sendCall = async (...args: any[]) => {
        // Wait if `on` is promise
        await _promise
        return new Promise((resolve, reject) => {
          const id = nanoid()
          let timeoutId

          if (timeout >= 0) {
            timeoutId = setTimeout(() => {
              reject(new Error(`[birpc] timeout on calling "${method}"`))
              rpcPromiseMap.delete(id)
            }, timeout).unref?.()
          }

          rpcPromiseMap.set(id, { resolve, reject, timeoutId })
          post(serialize(<Request>{ m: method, a: args, i: id, t: 'q' }))
        })
      }
      sendCall.asEvent = sendEvent
      return sendCall
    },
  }) as BirpcReturn<RemoteFunctions, LocalFunctions>

  _promise = on(async (data, ...extra) => {
    const msg = deserialize(data) as RPCMessage
    if (msg.t === 'q') {
      const { m: method, a: args } = msg
      let result, error: any
      const fn = resolver
        ? resolver(method, (functions as any)[method])
        : (functions as any)[method]

      if (!fn) {
        error = new Error(`[birpc] function "${method}" not found`)
      }
      else {
        try {
          result = await fn.apply(rpc, args)
        }
        catch (e) {
          error = e
        }
      }

      if (msg.i) {
        if (error && options.onError)
          options.onError(error, method, args)
        post(serialize(<Response>{ t: 's', i: msg.i, r: result, e: error }), ...extra)
      }
    }
    else {
      const { i: ack, r: result, e: error } = msg
      const promise = rpcPromiseMap.get(ack)
      if (promise) {
        clearTimeout(promise.timeoutId)

        if (error)
          promise.reject(error)
        else
          promise.resolve(result)
      }
      rpcPromiseMap.delete(ack)
    }
  })

  return rpc
}

const cacheMap = new WeakMap<any, any>()
export function cachedMap<T, R>(items: T[], fn: ((i: T) => R)): R[] {
  return items.map((i) => {
    let r = cacheMap.get(i)
    if (!r) {
      r = fn(i)
      cacheMap.set(i, r)
    }
    return r
  })
}

export function createBirpcGroup<RemoteFunctions = Record<string, never>, LocalFunctions = Record<string, never>>(
  functions: LocalFunctions,
  channels: ChannelOptions[] | (() => ChannelOptions[]),
  options: EventOptions<RemoteFunctions> = {},
): BirpcGroup<RemoteFunctions, LocalFunctions> {
  const getChannels = () => typeof channels === 'function' ? channels() : channels
  const getClients = (channels = getChannels()) => cachedMap(channels, s => createBirpc(functions, { ...options, ...s }))

  const broadcastProxy = new Proxy({}, {
    get(_, method) {
      const client = getClients()
      const callbacks = client.map(c => (c as any)[method])
      const sendCall = (...args: any[]) => {
        return Promise.all(callbacks.map(i => i(...args)))
      }
      sendCall.asEvent = (...args: any[]) => {
        callbacks.map(i => i.asEvent(...args))
      }
      return sendCall
    },
  }) as BirpcGroupReturn<RemoteFunctions>

  function updateChannels(fn?: ((channels: ChannelOptions[]) => void)) {
    const channels = getChannels()
    fn?.(channels)
    return getClients(channels)
  }

  getClients()

  return {
    get clients() {
      return getClients()
    },
    functions,
    updateChannels,
    broadcast: broadcastProxy,
    /**
     * @deprecated use `broadcast`
     */
    // @ts-expect-error deprecated
    boardcast: broadcastProxy,
  }
}

// port from nanoid
// https://github.com/ai/nanoid
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
function nanoid(size = 21) {
  let id = ''
  let i = size
  while (i--)
    id += urlAlphabet[(random() * 64) | 0]
  return id
}
