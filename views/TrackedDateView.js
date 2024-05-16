export class TrackedDateView {
  constructor(model, app) {
    this.model = model
    this.app = app
    this.initialize()
  }

  initialize() {
    this.root = document.createElement("section")
    this.root.id = `date-${this.model.dateAsISO()}`

    this.details = document.createElement("details")
    this.root.appendChild(this.details)
    const summary = document.createElement("summary")
    this.details.appendChild(summary)

    this.date = document.createElement("strong")
    this.date.classList.add("text-lg")
    this.date.dataset.name = "date"
    summary.appendChild(this.date)

    this.time = document.createElement("span")
    this.time.classList.add("text-lg")
    this.time.dataset.name = "time"
    summary.appendChild(this.time)

    const timeModificationControls = document.createElement("div")
    timeModificationControls.classList.add("time-modification-controls")
    this.details.appendChild(timeModificationControls)

    const timeInput = document.createElement("div")
    timeInput.classList.add("time-input")
    timeModificationControls.appendChild(timeInput)

    this.hoursInput = document.createElement("input")
    this.hoursInput.dataset.name = "hours-input"
    this.hoursInput.inputMode = "numeric"
    this.hoursInput.placeholder = "00"
    timeInput.appendChild(this.hoursInput)

    this.minutesInput = document.createElement("input")
    this.minutesInput.dataset.name = "minutes-input"
    this.minutesInput.inputMode = "numeric"
    this.minutesInput.placeholder = "00"
    timeInput.appendChild(this.minutesInput)

    this.addButton = document.createElement("button")
    this.addButton.classList.add("ml-auto")
    this.addButton.dataset.name = "add-button"
    this.addButton.textContent = "Lägg till"
    this.addButton.addEventListener(
      "click",
      this.handleAddButtonClick.bind(this)
    )
    timeModificationControls.appendChild(this.addButton)

    this.subtractButton = document.createElement("button")
    this.subtractButton.dataset.name = "subtract-button"
    this.subtractButton.textContent = "Ta bort"
    this.subtractButton.addEventListener(
      "click",
      this.handleSubtractButtonClick.bind(this)
    )
    timeModificationControls.appendChild(this.subtractButton)

    this.untrackDateButton = document.createElement("button")
    this.untrackDateButton.dataset.name = "untrack-date-button"
    this.untrackDateButton.classList.add("untrack-date-button")
    this.untrackDateButton.textContent = "Släng"
    this.untrackDateButton.addEventListener(
      "click",
      this.handleUntrackDateButtonClick.bind(this)
    )
    this.root.appendChild(this.untrackDateButton)

    const handlePointerMove = this.handlePointerMove.bind(this)

    this.details.addEventListener("pointerdown", (event) => {
      this.state = {
        initialX: event.clientX,
        offset: {
          x: event.clientX - event.target.offsetLeft,
          y: event.clientY - event.target.offsetTop,
        },
      }
      this.details.setPointerCapture(event.pointerId)
      this.details.addEventListener("pointermove", handlePointerMove)
    })

    this.details.addEventListener("pointerup", (event) => {
      const width = this.untrackDateButton.getBoundingClientRect().width
      const distanceMoved = this.state.initialX - event.clientX
      this.root.classList.add("animate-transform")
      setTimeout(() => {
        this.root.classList.remove("animate-transform")
      }, 200)

      if (distanceMoved > width * 0.5) {
        this.root.style.transform = `translateX(-${width}px)`
      } else {
        this.root.style.transform = `translateX(0px)`
      }

      this.state = undefined
      this.details.releasePointerCapture(event.pointerId)
      this.details.removeEventListener("pointermove", handlePointerMove)
    })

    this.render()
  }

  handlePointerMove(event) {
    if (!this.state) return
    this.root.style.transform = `translateX(${
      event.clientX - this.state.offset.x + "px"
    })`
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

  handleUntrackDateButtonClick() {
    this.app.untrackDate(this.model)
  }
}
