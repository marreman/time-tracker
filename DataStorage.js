export class DataStorage {
  retrive() {
    return JSON.parse(localStorage.getItem("time-tracker") ?? "{}")
  }

  persist(data) {
    localStorage.setItem("time-tracker", JSON.stringify(data))
  }
}
