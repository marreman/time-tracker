import { TimeCount } from "./TimeCount.js"

export class TrackedDate {
  #date
  #time
  #changeHandler
  #deleteHandler

  constructor(dateString, timeString) {
    this.#date = new Date(dateString)
    this.#time = TimeCount.fromDisplayString(timeString)
  }

  get time() {
    return this.#time
  }

  dateAsISO() {
    return this.#date.toISOString().slice(0, 10)
  }

  dateAsString() {
    return new Intl.DateTimeFormat("sv-SE").format(this.#date)
  }

  timeAsString() {
    return this.#time.asString()
  }

  timeIsZero() {
    return this.#time.isZero()
  }

  addTime(hoursString, minutesString) {
    this.#time.add(TimeCount.fromStringParts(hoursString, minutesString))
    this.#changeHandler()
  }

  subtractTime(hoursString, minutesString) {
    this.#time.subtract(TimeCount.fromStringParts(hoursString, minutesString))
    this.#changeHandler()
  }

  onChange(fn) {
    this.#changeHandler = fn
  }

  onDelete(fn) {
    this.#deleteHandler = fn
  }

  delete() {
    this.#deleteHandler?.()
  }
}
