export class ElementHandle {
  constructor(element) {
    this.element = element
  }

  find(name) {
    const result = this.element.querySelector(`[data-name='${name}']`)
    if (!result) {
      console.error(
        `Found no element with data-name=${name}`,
        "in",
        this.element
      )
    }
    return result
  }

  trackedDate(dateString) {
    const element = this.element.querySelector(`#date-${dateString}`)
    if (element) {
      return new ElementHandle(element)
    }
  }

  get isRendered() {
    return this.element.isConnected
  }
}

export function test(desc, testFn) {
  testFn((a, b) => {
    if (a != b) {
      console.error("%s. Actual: %s, Expected: %s", desc, a, b)
    }
  })
}
