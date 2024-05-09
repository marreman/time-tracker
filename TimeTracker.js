import { TrackedDate } from "./TrackedDate.js"

export class TimeTracker {
  #trackedDates = new Map()
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
    trackedDate.onChange(this.saveToStorage.bind(this))
    trackedDate.onDelete(() => this.deleteTrackedDate(trackedDate))
    this.#trackedDates.set(trackedDate.dateAsISO(), trackedDate)
  }

  deleteTrackedDate(trackedDate) {
    this.#trackedDates.delete(trackedDate.dateAsISO())
    this.saveToStorage()
    this.#changeHandler?.()
  }

  onChange(fn) {
    this.#changeHandler = fn
  }
}
