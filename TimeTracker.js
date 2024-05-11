import { TimeCount } from "./TimeCount.js"
import { TrackedDate } from "./TrackedDate.js"

export class TimeTracker {
  #trackedDates = new Map()
  #deleteHandler
  #changeHandler

  constructor(storage) {
    this.storage = storage
    this.loadFromStorage()
  }

  loadFromStorage() {
    const entries = Object.entries(this.storage.retrive())
    for (const [dateString, timeString] of entries) {
      this.trackDate(dateString, timeString)
    }
  }

  saveToStorage() {
    const serialized = Object.fromEntries(
      Array.from(this.#trackedDates.values()).map((td) => {
        return [td.dateAsISO(), td.timeAsString()]
      })
    )
    this.storage.persist(serialized)
  }

  eachDate(f) {
    for (const trackedDate of this.#trackedDates.values()) {
      f(trackedDate)
    }
  }

  trackDate(dateString, timeString = "0:0") {
    const trackedDate = new TrackedDate(dateString, timeString)
    if (this.#trackedDates.has(trackedDate.dateAsISO())) return
    trackedDate.onChange(() => {
      this.saveToStorage()
      this.#changeHandler?.()
    })
    trackedDate.onDelete(() => this.deleteTrackedDate(trackedDate))
    this.#trackedDates.set(trackedDate.dateAsISO(), trackedDate)
  }

  deleteTrackedDate(trackedDate) {
    this.#trackedDates.delete(trackedDate.dateAsISO())
    this.saveToStorage()
    this.#deleteHandler?.()
  }

  onDelete(fn) {
    this.#deleteHandler = fn
  }

  onChange(fn) {
    this.#changeHandler = fn
  }

  totalTime() {
    const total = new TimeCount(0, 0)
    this.eachDate((trackedDate) => {
      total.add(trackedDate.time)
    })
    return total.asString()
  }
}
