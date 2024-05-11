import { Row } from "./Row.js"
import { TrackedDateView } from "./TrackedDateView.js"

export class TimeTrackerView {
  constructor(timeTracker, parentElement) {
    this.timeTracker = timeTracker
    this.root = parentElement

    timeTracker.onDelete(this.render.bind(this))
    timeTracker.onChange(() => {
      this.updateFooter()
    })
  }

  render() {
    this.root.innerHTML = ""
    this.renderHeader()
    this.renderDates()
    this.root.appendChild(document.createElement("hr"))
    this.renderFooter()
  }

  renderDates() {
    this.timeTracker.eachDate((trackedDate) => {
      const view = new TrackedDateView(trackedDate)
      this.root.appendChild(document.createElement("hr"))
      this.root.appendChild(view.root)
    })
  }

  renderHeader() {
    const header = document.createElement("header")

    const title = document.createElement("h1")
    title.textContent = "Tidsräknare"
    header.appendChild(title)

    const row = new Row()
    header.appendChild(row.el)

    this.newDateInput = document.createElement("input")
    this.newDateInput.dataset.name = "new-date-input"
    this.newDateInput.type = "date"
    this.newDateInput.valueAsDate = new Date()
    row.appendChild(this.newDateInput)

    const newDateButton = document.createElement("button")
    newDateButton.dataset.name = "new-date-button"
    newDateButton.textContent = "Lägg till datum"
    newDateButton.addEventListener("click", this.addNewDate.bind(this))
    row.appendChild(newDateButton)

    this.root.appendChild(header)
  }

  renderFooter() {
    this.footer = document.createElement("footer")
    this.footer.dataset.name = "total-time"
    this.footer.style.textAlign = "right"
    this.footer.style.fontSize = "1.5em"
    this.footer.textContent = this.timeTracker.totalTime()
    this.root.appendChild(this.footer)
  }

  updateFooter() {
    this.footer.textContent = this.timeTracker.totalTime()
  }

  addNewDate() {
    const value = this.newDateInput.value
    this.timeTracker.trackDate(value)
    this.render()
  }
}
