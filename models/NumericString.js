export class NumericString {
  constructor(numberString) {
    this.numberString = numberString
  }

  asNumber() {
    const parsedNumber = parseInt(this.numberString, 10)
    return isNaN(parsedNumber) ? 0 : parsedNumber
  }
}
