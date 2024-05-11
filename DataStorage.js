export class DataStorage {
  retrive() {
    return JSON.parse(localStorage.getItem("time-tracker") ?? "{}")
  }

  persist(data) {
    localStorage.setItem("time-tracker", JSON.stringify(data))
    this.ensureDataIsPersisted()
  }

  async ensureDataIsPersisted() {
    const persisted = await navigator.storage.persisted()
    if (!persisted) {
      await navigator.storage.persist()
    }
  }
}
