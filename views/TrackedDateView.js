import { Row } from "./Row.js"

export class TrackedDateView {
  constructor(model, app) {
    this.model = model
    this.app = app
    this.initialize()
  }

  initialize() {
    this.root = document.createElement("details")
    this.root.id = `date-${this.model.dateAsISO()}`

    const summary = document.createElement("summary")
    this.root.appendChild(summary)

    this.date = document.createElement("strong")
    this.date.classList.add("text-lg")
    this.date.dataset.name = "date"
    summary.appendChild(this.date)

    this.time = document.createElement("span")
    this.time.classList.add("text-lg")
    this.time.dataset.name = "time"
    summary.appendChild(this.time)

    const row = new Row()
    row.el.style.marginTop = "16px"
    this.root.appendChild(row.el)

    const timeInput = document.createElement("div")
    timeInput.classList.add("time-input")
    row.appendChild(timeInput)

    this.hoursInput = document.createElement("input")
    this.hoursInput.dataset.name = "hours-input"
    this.hoursInput.inputMode = "numeric"
    this.hoursInput.placeholder = "00"
    this.hoursInput.style.minWidth = 0
    timeInput.appendChild(this.hoursInput)

    this.minutesInput = document.createElement("input")
    this.minutesInput.dataset.name = "minutes-input"
    this.minutesInput.inputMode = "numeric"
    this.minutesInput.placeholder = "00"
    this.minutesInput.style.minWidth = 0
    timeInput.appendChild(this.minutesInput)

    this.addButton = document.createElement("button")
    this.addButton.classList.add("ml-auto")
    this.addButton.dataset.name = "add-button"
    this.addButton.textContent = "Lägg till"
    this.addButton.addEventListener(
      "click",
      this.handleAddButtonClick.bind(this)
    )
    row.appendChild(this.addButton)

    this.subtractButton = document.createElement("button")
    this.subtractButton.dataset.name = "subtract-button"
    this.subtractButton.textContent = "Ta bort"
    this.subtractButton.addEventListener(
      "click",
      this.handleSubtractButtonClick.bind(this)
    )
    row.appendChild(this.subtractButton)

    this.render()
  }

  render() {
    this.date.textContent = this.model.dateAsString()
    this.time.textContent = this.model.timeAsString()
  }

  handleAddButtonClick() {
    this.app.addTime(this.model, this.hoursInput.value, this.minutesInput.value)
    this.hoursInput.value = ""
    this.minutesInput.value = ""
  }

  handleSubtractButtonClick() {
    this.app.subtractTime(
      this.model,
      this.hoursInput.value,
      this.minutesInput.value
    )
    this.hoursInput.value = ""
    this.minutesInput.value = ""
  }
}
