import { TimeCount } from "./TimeCount.js"

export class TrackedDate {
  static fromJSON(dateString, timeString) {
    return new TrackedDate(
      new Date(dateString),
      TimeCount.fromString(timeString)
    )
  }

  #date
  #time

  constructor(date, timeCount = new TimeCount()) {
    this.#date = date
    this.#time = timeCount
  }

  get date() {
    return this.#date
  }

  get time() {
    return this.#time
  }

  dateAsISO() {
    return this.#date.toISOString().slice(0, 10)
  }

  dateAsString() {
    return new Intl.DateTimeFormat("sv-SE", {
      day: "numeric",
      month: "short",
      weekday: "short",
    }).format(this.#date)
  }

  timeAsString() {
    return this.#time.asString()
  }

  timeIsZero() {
    return this.#time.isZero()
  }

  addTime(hoursString, minutesString) {
    this.#time = this.#time.add(
      TimeCount.fromStringParts(hoursString, minutesString)
    )
  }

  subtractTime(hoursString, minutesString) {
    this.#time = this.#time.subtract(
      TimeCount.fromStringParts(hoursString, minutesString)
    )
  }
}
