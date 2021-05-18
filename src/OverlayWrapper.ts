import type {
  GenericObjectType,
  GenericCallbackType,
  OverlayWindowType,
  MessageEventOverlayType,
  CombatDataType,
} from './types'

class OverlayWrapperBase {
  wsUrl: RegExpExecArray
  queue: any[]
  rseqCounter: number
  responsePromises: GenericObjectType
  subscribers: GenericObjectType
  eventsStarted: boolean
  window: OverlayWindowType
  ws?: WebSocket
  sendMessage?: (obj: GenericObjectType, cb?: GenericCallbackType) => void

  init: () => void
  processEvent: (
    msg: CombatDataType | MessageEventOverlayType<CombatDataType>
  ) => void
  connectWs: () => void
  waitForApi: () => void
}

export default class OverlayWrapper extends OverlayWrapperBase {
  constructor() {
    super()
    this.wsUrl = /[\?&]OVERLAY_WS=([^&]+)/.exec(location.href)
    this.queue = []
    this.rseqCounter = 0
    this.responsePromises = {}
    this.subscribers = {}
    this.eventsStarted = false
    this.window = window as OverlayWindowType

    this.init()
  }

  init = () => {
    if (this.wsUrl) {
      this.sendMessage = (obj) =>
        this.queue ? this.queue.push(obj) : this.ws.send(JSON.stringify(obj))

      this.connectWs()
    } else {
      this.sendMessage = (obj, cb) => {
        this.queue
          ? this.queue.push([obj, cb])
          : this.window.OverlayPluginApi.callHandler(JSON.stringify(obj), cb)
      }

      this.waitForApi()
    }

    // Attack event
    this.window.dispatchOverlayEvent = this.processEvent

    // Attach event
    this.window.addOverlayListener = (event, cb) => {
      if (this.eventsStarted && this.subscribers[event]) {
        console.warn(`
          A new listener for ${event} has been registered after event transmission has already begun.
          Some events might have been missed and no cached values will be transmitted.
          Please register your listeners before calling startOverlayEvents().
        `)
      }

      if (!this.subscribers[event]) {
        this.subscribers[event] = []
      }

      this.subscribers[event].push(cb)
    }

    // Attack event
    this.window.removeOverlayListener = (event, cb) => {
      if (this.subscribers[event]) {
        let list = this.subscribers[event]
        const pos = list.indexOf(cb)

        if (pos > -1) list.splice(pos, 1)
      }
    }

    // Attack event
    this.window.callOverlayHandler = (msg: MessageEventOverlayType) => {
      if (this.ws) {
        msg.rseq = this.rseqCounter++
        this.sendMessage(msg)

        return new Promise((resolve) => {
          this.responsePromises[msg.rseq] = resolve
        })
      }

      return new Promise((resolve) => {
        this.sendMessage(msg, (data) => {
          resolve(data == null ? null : JSON.parse(data))
        })
      })
    }

    // Attack event
    this.window.startOverlayEvents = () => {
      this.eventsStarted = false

      this.sendMessage({
        call: 'subscribe',
        events: Object.keys(this.subscribers),
      })
    }
  }

  processEvent = (
    msg: CombatDataType | MessageEventOverlayType<CombatDataType>
  ) => {
    if (this.subscribers[msg.type]) {
      for (let sub of this.subscribers[msg.type]) sub(msg)
    }
  }

  connectWs = () => {
    // Initialize websocket
    this.ws = new WebSocket(this.wsUrl[1])
    // Handle errors
    this.ws.addEventListener('error', (e: CustomEvent) => console.error(e))
    // On connect, send messages
    this.ws.addEventListener('open', () => {
      console.log('Connected!')

      let q = this.queue
      this.queue = null

      for (let msg of q) this.sendMessage(msg)
    })
    // On message try to parse the data
    this.ws.addEventListener(
      'message',
      (msg: MessageEventOverlayType<CombatDataType>) => {
        try {
          msg = JSON.parse(msg.data)
        } catch (e) {
          console.error('Invalid message received: ', msg)
          return
        }

        if (msg.rseq !== undefined && this.responsePromises[msg.rseq]) {
          this.responsePromises[msg.rseq](msg)
          delete this.responsePromises[msg.rseq]
        } else {
          this.processEvent(msg)
        }
      }
    )
    // On close, remove any queue and try to reconneect every 3s
    this.ws.addEventListener('close', () => {
      this.queue = []

      console.log('Trying to reconnect...')
      // Don't spam the server with retries.
      setTimeout(() => {
        this.connectWs()
      }, 300)
    })
  }

  waitForApi = () => {
    if (!this.window.OverlayPluginApi || !this.window.OverlayPluginApi.ready) {
      setTimeout(this.waitForApi, 300)
      return
    }

    let q = this.queue
    this.queue = null
    this.window.__OverlayCallback = this.processEvent

    for (let [msg, resolve] of q) this.sendMessage(msg, resolve)
  }
}
