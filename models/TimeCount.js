import { NumericString } from "./NumericString.js"
import { test } from "../test-lib.js"

export class TimeCount {
  #minutes

  static fromString(timeString = "") {
    let isNegative = false
    if (timeString.startsWith("–")) {
      isNegative = true
      timeString = timeString.slice(1)
    }
    const [hoursString, minutesString] = timeString.split(":")
    return TimeCount.fromStringParts(hoursString, minutesString, isNegative)
  }

  static fromStringParts(hoursString, minutesString, isNegative) {
    let minutes = new NumericString(minutesString).asNumber()
    minutes += new NumericString(hoursString).asNumber() * 60
    if (isNegative) minutes *= -1
    return new TimeCount(minutes)
  }

  constructor(minutes = 0) {
    this.minutes = Math.round(minutes)
  }

  get minutes() {
    return this.#minutes
  }

  set minutes(value) {
    this.#minutes = value
  }

  isZero() {
    return !this.#minutes
  }

  asString() {
    const isNegative = this.#minutes < 0
    const absMinutes = Math.abs(this.#minutes)
    const hours = Math.floor(absMinutes / 60)
    const minutes = absMinutes % 60
    return `${isNegative ? "–" : ""}${hours}:${minutes
      .toString()
      .padStart(2, "0")}`
  }

  add(aTimeCount) {
    return new TimeCount(this.minutes + aTimeCount.minutes)
  }

  subtract(aTimeCount) {
    return new TimeCount(this.minutes - aTimeCount.minutes)
  }
}

test("adds hours when necessary", (isEqual) => {
  const a = TimeCount.fromString("0:00")
  const b = TimeCount.fromString("0:90")
  const r = a.add(b)
  isEqual(r.asString(), "1:30")
})

test("removes hours when necessary", (isEqual) => {
  const a = TimeCount.fromString("1:10")
  const b = TimeCount.fromString("0:40")
  const r = a.subtract(b)
  isEqual(r.asString(), "0:30")
})
