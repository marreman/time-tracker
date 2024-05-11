import { TimeTracker } from "../models/TimeTracker.js"
import { TrackedDate } from "../models/TrackedDate.js"
import { TimeTrackerView } from "../views/TimeTrackerView.js"

export class App {
  constructor(storage) {
    this.storage = storage
    this.model = TimeTracker.fromJSON(this.storage.retrive())
    this.view = new TimeTrackerView(this.model, this)
    this.view.initialize()
  }

  trackDate(dateString) {
    const trackedDate = new TrackedDate(new Date(dateString))
    this.model.addTrackedDate(trackedDate)
    this.storage.persist(this.model.toJSON())
    this.view.render()
  }

  untrackDate(trackedDate) {
    this.model.removeTrackedDate(trackedDate)
    this.storage.persist(this.model.toJSON())
    this.view.render()
  }

  addTime(trackedDate, hoursString, minutesString) {
    trackedDate.addTime(hoursString, minutesString)
    this.storage.persist(this.model.toJSON())
    this.view.render()
  }

  subtractTime(trackedDate, hoursString, minutesString) {
    if (trackedDate.timeIsZero()) {
      this.model.removeTrackedDate(trackedDate)
    } else {
      trackedDate.subtractTime(hoursString, minutesString)
    }
    this.storage.persist(this.model.toJSON())
    this.view.render()
  }
}
