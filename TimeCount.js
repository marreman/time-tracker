import { NumericString } from "./NumericString.js"
import { test } from "./test-lib.js"

export class TimeCount {
  #minutes

  static fromDisplayString(timeDisplayString) {
    return TimeCount.fromStringParts(...timeDisplayString.split(":"))
  }

  static fromStringParts(hoursString, minutesString) {
    const hours = new NumericString(hoursString).asNumber()
    const minutes = new NumericString(minutesString).asNumber()
    return new TimeCount(hours, minutes)
  }

  constructor(hours, minutes) {
    this.minutes = Math.round(minutes + hours * 60)
  }

  get minutes() {
    return this.#minutes
  }

  set minutes(value) {
    this.#minutes = Math.max(0, value)
  }

  isZero() {
    return !this.#minutes
  }

  asString() {
    const hours = Math.floor(this.#minutes / 60)
    const minutes = this.#minutes % 60
    return `${hours}:${minutes.toString().padStart(2, "0")}`
  }

  add(aTimeCount) {
    this.minutes += aTimeCount.minutes
  }

  subtract(aTimeCount) {
    this.minutes -= aTimeCount.minutes
  }
}

test("adds hours when necessary", (isEqual) => {
  const a = new TimeCount(0, 0)
  a.add(new TimeCount(0, 90))
  isEqual(a.asString(), "1:30")
})

test("removes hours when necessary", (isEqual) => {
  const a = new TimeCount(1, 10)
  a.subtract(new TimeCount(0, 40))
  isEqual(a.asString(), "0:30")
})
