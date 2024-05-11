import { Row } from "./Row.js"

export class TrackedDateView {
  constructor(trackedDate) {
    this.model = trackedDate
    this.initializeEl()
  }

  initializeEl() {
    this.root = document.createElement("details")
    this.root.id = `date-${this.model.dateAsISO()}`

    const summary = document.createElement("summary")
    this.root.appendChild(summary)

    this.date = document.createElement("strong")
    this.date.classList.add("text-lg")
    this.date.dataset.name = "date"
    this.date.textContent = this.model.dateAsString()
    summary.appendChild(this.date)

    this.time = document.createElement("span")
    this.time.classList.add("text-lg")
    this.time.dataset.name = "time"
    this.time.textContent = this.model.time.asString()
    summary.appendChild(this.time)

    const row = new Row()
    row.el.style.marginTop = "10px"
    this.root.appendChild(row.el)

    this.hoursInput = document.createElement("input")
    this.hoursInput.dataset.name = "hours-input"
    this.hoursInput.type = "number"
    this.hoursInput.placeholder = "Timmar"
    this.hoursInput.style.minWidth = 0
    row.appendChild(this.hoursInput)

    this.minutesInput = document.createElement("input")
    this.minutesInput.dataset.name = "minutes-input"
    this.minutesInput.type = "number"
    this.minutesInput.placeholder = "Minuter"
    this.minutesInput.style.minWidth = 0
    row.appendChild(this.minutesInput)

    this.addButton = document.createElement("button")
    this.addButton.dataset.name = "add-button"
    this.addButton.textContent = "Lägg till"
    this.addButton.addEventListener("click", this.addTime.bind(this))
    row.appendChild(this.addButton)

    this.subtractButton = document.createElement("button")
    this.subtractButton.dataset.name = "subtract-button"
    this.subtractButton.textContent = "Ta bort"
    this.subtractButton.addEventListener(
      "click",
      this.subtractTimeOrRemoveTrackedDate.bind(this)
    )
    row.appendChild(this.subtractButton)
  }

  addTime() {
    this.model.addTime(this.hoursInput.value, this.minutesInput.value)
    this.hoursInput.value = ""
    this.minutesInput.value = ""
    this.updateTimeView()
  }

  subtractTimeOrRemoveTrackedDate() {
    if (this.model.timeIsZero()) {
      this.model.delete()
      return
    }
    this.model.subtractTime(this.hoursInput.value, this.minutesInput.value)
    this.hoursInput.value = ""
    this.minutesInput.value = ""
    this.updateTimeView()
  }

  updateTimeView() {
    this.time.textContent = this.model.timeAsString()
  }
}
