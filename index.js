import { LocalStorage } from "./models/LocalStorage.js"
import { runTests } from "./tests.js"
import { App } from "./controllers/App.js"

const app = new App(new LocalStorage("time-tracker"))
document.body.appendChild(app.view.root)

if (location.hash === "#test") {
  const testApp = new App(new LocalStorage("time-tracker-test"))
  runTests(testApp.view.root)
}
