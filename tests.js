import { ElementHandle, test } from "./test-lib.js"

export function runTests(app_) {
  const app = new ElementHandle(app_)
  const aDate = "1980-08-08"

  test("adding a new date", (isEqual) => {
    app.find("new-date-input").value = aDate
    app.find("new-date-button").click()
    isEqual(app.trackedDate(aDate).find("date").textContent, aDate)
    isEqual(app.trackedDate(aDate).find("time").textContent, "0:00")
  })

  test("adding time for the tracked date", (isEqual) => {
    app.trackedDate(aDate).find("hours-input").value = "2"
    app.trackedDate(aDate).find("minutes-input").value = "3"
    app.trackedDate(aDate).find("add-button").click()
    isEqual(app.trackedDate(aDate).find("time").textContent, "2:03")
  })

  test("that is shows a total", (isEqual) => {
    const anotherDate = "1990-09-09"

    app.find("new-date-input").value = anotherDate
    app.find("new-date-button").click()
    app.trackedDate(anotherDate).find("hours-input").value = "1"
    app.trackedDate(anotherDate).find("minutes-input").value = "1"
    app.trackedDate(anotherDate).find("add-button").click()

    isEqual(app.find("total-time").textContent, "3:04")

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
    isEqual(app.trackedDate(aDate).find("time").textContent, "1:02")
  })

  test("that hours and minutes can't go below zero", (isEqual) => {
    app.trackedDate(aDate).find("hours-input").value = "2"
    app.trackedDate(aDate).find("minutes-input").value = "3"
    app.trackedDate(aDate).find("subtract-button").click()
    isEqual(app.trackedDate(aDate).find("time").textContent, "0:00")
  })

  test("deleting the tracked date by clicking subtract when time is zero", (isEqual) => {
    isEqual(app.trackedDate(aDate).isRendered, true)
    app.trackedDate(aDate).find("subtract-button").click()
    isEqual(app.trackedDate(aDate), undefined)
  })
}
