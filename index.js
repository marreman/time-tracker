import { DataStorage } from "./DataStorage.js"
import { TimeTracker } from "./TimeTracker.js"
import { TimeTrackerView } from "./TimeTrackerView.js"
import { runTests } from "./tests.js"

const app = {}

app.storage = new DataStorage()
app.model = new TimeTracker(app.storage)
app.view = new TimeTrackerView(app.model, document.body)

app.view.render()

window.app = app

runTests(app.view.root)
