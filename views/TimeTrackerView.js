import { TrackedDateView } from "./TrackedDateView.js"

export class TimeTrackerView {
  constructor(model, app) {
    this.model = model
    this.app = app
    this.initialize()
  }

  initialize() {
    this.root = document.createElement("main")
    this.initializeHeader()
    this.trackedDates = document.createElement("div")
    this.root.appendChild(this.trackedDates)
    this.root.appendChild(document.createElement("hr"))
    this.initializeFooter()

    this.render()
  }

  initializeHeader() {
    const header = document.createElement("header")

    const title = document.createElement("h1")
    title.textContent = "Tidsräknare"
    header.appendChild(title)

    const newDateControls = document.createElement("div")
    newDateControls.classList.add("new-date-controls")
    header.appendChild(newDateControls)

    this.newDateInput = document.createElement("input")
    this.newDateInput.dataset.name = "new-date-input"
    this.newDateInput.type = "date"
    this.newDateInput.valueAsDate = new Date()
    newDateControls.appendChild(this.newDateInput)

    const newDateButton = document.createElement("button")
    newDateButton.dataset.name = "new-date-button"
    newDateButton.textContent = "Lägg till datum"
    newDateButton.addEventListener("click", () => {
      const dateString = this.newDateInput.value
      this.app.trackDate(dateString)
    })
    newDateControls.appendChild(newDateButton)

    this.root.appendChild(header)
  }

  initializeFooter() {
    this.footer = document.createElement("footer")
    this.footer.dataset.name = "total-time"
    this.footer.classList.add("text-lg", "text-right")
    this.root.appendChild(this.footer)
  }

  render() {
    this.renderFooter()
    this.renderDates()
  }

  renderDates() {
    this.trackedDates.innerHTML = ""
    this.model.eachDate((trackedDate) => {
      const section = document.createElement("section")
      const view = new TrackedDateView(trackedDate, this.app)
      section.appendChild(view.root)
      this.trackedDates.appendChild(document.createElement("hr"))
      this.trackedDates.appendChild(section)
    })
  }

  renderFooter() {
    this.footer.textContent = this.model.totalTime()
  }
}
