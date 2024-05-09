import { NumericString } from "./NumericString.js"

export class TimeCount {
  #hours
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
    this.hours = hours
    this.minutes = minutes
  }

  get hours() {
    return this.#hours
  }

  set hours(value) {
    this.#hours = Math.max(0, value)
  }

  get minutes() {
    return this.#minutes
  }

  set minutes(value) {
    this.#minutes = Math.max(0, value)
  }

  isZero() {
    return !this.hours && !this.minutes
  }

  asString() {
    return `${this.hours}:${this.minutes}`
  }

  add(aTimeCount) {
    this.hours += aTimeCount.hours
    this.minutes += aTimeCount.minutes
  }

  subtract(aTimeCount) {
    this.hours -= aTimeCount.hours
    this.minutes -= aTimeCount.minutes
  }
}
