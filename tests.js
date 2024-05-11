export function runTests(app_) {
  let app = new ElementHandle(app_)
  let trackedDate

  test("adding a new date", (isEqual) => {
    app.find("new-date-input").value = "1980-08-08"
    app.find("new-date-button").click()

    trackedDate = app.handleFromSelector("#date-1980-08-08")

    isEqual(trackedDate.find("date").textContent, "1980-08-08")
    isEqual(trackedDate.find("time").textContent, "0:0")
  })

  test("adding time for the tracked date", (isEqual) => {
    trackedDate.find("hours-input").value = "2"
    trackedDate.find("minutes-input").value = "3"
    trackedDate.find("add-button").click()
    isEqual(trackedDate.find("time").textContent, "2:3")
  })

  test("subtracting time for the tracked date", (isEqual) => {
    trackedDate.find("hours-input").value = "1"
    trackedDate.find("minutes-input").value = "1"
    trackedDate.find("subtract-button").click()
    isEqual(trackedDate.find("time").textContent, "1:2")
  })

  test("that hours and minutes can't go below zero", (isEqual) => {
    trackedDate.find("hours-input").value = "2"
    trackedDate.find("minutes-input").value = "3"
    trackedDate.find("subtract-button").click()
    isEqual(trackedDate.find("time").textContent, "0:0")
  })

  test("deleting the tracked date by clicking subtract when time is zero", (isEqual) => {
    isEqual(trackedDate.isRendered, true)
    trackedDate.find("subtract-button").click()
    isEqual(trackedDate.isRendered, false)
  })
}

class ElementHandle {
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

  handleFromSelector(selector) {
    const element = this.element.querySelector(selector)
    if (element) {
      return new ElementHandle(element)
    }
  }

  get isRendered() {
    return this.element.isConnected
  }
}

function test(desc, testFn) {
  testFn((a, b) => {
    if (a != b) {
      console.error("%s. Actual: %s, Expected: %s", desc, a, b)
    }
  })
}
