export function runTests(app) {
  let trackedDate

  test("adding a new date", (isEqual) => {
    app.querySelector("[data-name='new-date-input']").value = "1980-08-08"
    app.querySelector("[data-name='new-date-button']").click()

    trackedDate = new ElementHandle(app.querySelector("#date-1980-08-08"))

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
    return this.element.querySelector(`[data-name='${name}']`)
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
