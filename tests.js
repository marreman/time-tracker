export function runTests(app_) {
  let app = new ElementHandle(app_)

  test("adding a new date", (isEqual) => {
    app.find("new-date-input").value = "1980-08-08"
    app.find("new-date-button").click()
    isEqual(
      app.trackedDate("1980-08-08").find("date").textContent,
      "1980-08-08"
    )
    isEqual(app.trackedDate("1980-08-08").find("time").textContent, "0:0")
  })

  test("adding time for the tracked date", (isEqual) => {
    app.trackedDate("1980-08-08").find("hours-input").value = "2"
    app.trackedDate("1980-08-08").find("minutes-input").value = "3"
    app.trackedDate("1980-08-08").find("add-button").click()
    isEqual(app.trackedDate("1980-08-08").find("time").textContent, "2:3")
  })

  test("that is shows a total", (isEqual) => {
    app.find("new-date-input").value = "1990-09-09"
    app.find("new-date-button").click()
    app.trackedDate("1990-09-09").find("hours-input").value = "1"
    app.trackedDate("1990-09-09").find("minutes-input").value = "1"
    app.trackedDate("1990-09-09").find("add-button").click()

    isEqual(app.find("total-time").textContent, "3:4")

    // Clean up
    app.trackedDate("1990-09-09").find("hours-input").value = "1"
    app.trackedDate("1990-09-09").find("minutes-input").value = "1"
    app.trackedDate("1990-09-09").find("subtract-button").click()
    app.trackedDate("1990-09-09").find("subtract-button").click()
  })

  test("subtracting time for the tracked date", (isEqual) => {
    app.trackedDate("1980-08-08").find("hours-input").value = "1"
    app.trackedDate("1980-08-08").find("minutes-input").value = "1"
    app.trackedDate("1980-08-08").find("subtract-button").click()
    isEqual(app.trackedDate("1980-08-08").find("time").textContent, "1:2")
  })

  test("that hours and minutes can't go below zero", (isEqual) => {
    app.trackedDate("1980-08-08").find("hours-input").value = "2"
    app.trackedDate("1980-08-08").find("minutes-input").value = "3"
    app.trackedDate("1980-08-08").find("subtract-button").click()
    isEqual(app.trackedDate("1980-08-08").find("time").textContent, "0:0")
  })

  test("deleting the tracked date by clicking subtract when time is zero", (isEqual) => {
    isEqual(app.trackedDate("1980-08-08").isRendered, true)
    app.trackedDate("1980-08-08").find("subtract-button").click()
    isEqual(app.trackedDate("1980-08-08"), undefined)
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
