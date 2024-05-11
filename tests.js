export function runTests(app_) {
  const app = new ElementHandle(app_)
  const aDate = "1980-08-08"

  test("adding a new date", (isEqual) => {
    app.find("new-date-input").value = aDate
    app.find("new-date-button").click()
    isEqual(app.trackedDate(aDate).find("date").textContent, aDate)
    isEqual(app.trackedDate(aDate).find("time").textContent, "0:0")
  })

  test("adding time for the tracked date", (isEqual) => {
    app.trackedDate(aDate).find("hours-input").value = "2"
    app.trackedDate(aDate).find("minutes-input").value = "3"
    app.trackedDate(aDate).find("add-button").click()
    isEqual(app.trackedDate(aDate).find("time").textContent, "2:3")
  })

  test("that is shows a total", (isEqual) => {
    const anotherDate = "1990-09-09"

    app.find("new-date-input").value = anotherDate
    app.find("new-date-button").click()
    app.trackedDate(anotherDate).find("hours-input").value = "1"
    app.trackedDate(anotherDate).find("minutes-input").value = "1"
    app.trackedDate(anotherDate).find("add-button").click()

    isEqual(app.find("total-time").textContent, "3:4")

    // Clean up
    app.trackedDate(anotherDate).find("hours-input").value = "1"
    app.trackedDate(anotherDate).find("minutes-input").value = "1"
    app.trackedDate(anotherDate).find("subtract-button").click()
    app.trackedDate(anotherDate).find("subtract-button").click()
  })

  test("subtracting time for the tracked date", (isEqual) => {
    app.trackedDate(aDate).find("hours-input").value = "1"
    app.trackedDate(aDate).find("minutes-input").value = "1"
    app.trackedDate(aDate).find("subtract-button").click()
    isEqual(app.trackedDate(aDate).find("time").textContent, "1:2")
  })

  test("that hours and minutes can't go below zero", (isEqual) => {
    app.trackedDate(aDate).find("hours-input").value = "2"
    app.trackedDate(aDate).find("minutes-input").value = "3"
    app.trackedDate(aDate).find("subtract-button").click()
    isEqual(app.trackedDate(aDate).find("time").textContent, "0:0")
  })

  test("deleting the tracked date by clicking subtract when time is zero", (isEqual) => {
    isEqual(app.trackedDate(aDate).isRendered, true)
    app.trackedDate(aDate).find("subtract-button").click()
    isEqual(app.trackedDate(aDate), undefined)
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

function test(desc, testFn) {
  testFn((a, b) => {
    if (a != b) {
      console.error("%s. Actual: %s, Expected: %s", desc, a, b)
    }
  })
}
