import { TimeCount } from "./TimeCount.js"
import { TrackedDate } from "./TrackedDate.js"

export class TimeTracker {
  static fromJSON(json) {
    const timeTracker = new TimeTracker()
    for (const [dateString, timeString] of Object.entries(json)) {
      const trackedDate = TrackedDate.fromJSON(dateString, timeString)
      timeTracker.addTrackedDate(trackedDate)
    }
    return timeTracker
  }

  #trackedDates = new Map()

  toJSON() {
    return Object.fromEntries(
      Array.from(this.#trackedDates.values()).map((td) => {
        return [td.dateAsISO(), td.timeAsString()]
      })
    )
  }

  eachDate(f) {
    const sorted = Array.from(this.#trackedDates.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    for (const trackedDate of sorted) {
      f(trackedDate)
    }
  }

  addTrackedDate(trackedDate) {
    if (this.#trackedDates.has(trackedDate.dateAsISO())) return
    this.#trackedDates.set(trackedDate.dateAsISO(), trackedDate)
  }

  removeTrackedDate(trackedDate) {
    this.#trackedDates.delete(trackedDate.dateAsISO())
  }

  totalTime() {
    const total = new TimeCount(0, 0)
    this.eachDate((trackedDate) => {
      total.add(trackedDate.time)
    })
    return total.asString()
  }
}
