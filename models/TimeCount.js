import { NumericString } from "./NumericString.js"
import { test } from "../test-lib.js"

export class TimeCount {
  #minutes

  static fromDisplayString(timeDisplayString = "") {
    return TimeCount.fromStringParts(...timeDisplayString.split(":"))
  }

  static fromStringParts(hoursString, minutesString) {
    const hours = new NumericString(hoursString).asNumber()
    const minutes = new NumericString(minutesString).asNumber()
    return new TimeCount(hours, minutes)
  }

  constructor(hours = 0, minutes = 0) {
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
    return new TimeCount(0, this.minutes + aTimeCount.minutes)
  }

  subtract(aTimeCount) {
    return new TimeCount(0, this.minutes - aTimeCount.minutes)
  }
}

test("adds hours when necessary", (isEqual) => {
  const a = new TimeCount(0, 0)
  const b = new TimeCount(0, 90)
  const r = a.add(b)
  isEqual(r.asString(), "1:30")
})

test("removes hours when necessary", (isEqual) => {
  const a = new TimeCount(1, 10)
  const b = new TimeCount(0, 40)
  const r = a.subtract(b)
  isEqual(r.asString(), "0:30")
})
