export class LocalStorage {
  constructor(storageKey) {
    this.storageKey = storageKey
  }

  retrive() {
    return JSON.parse(localStorage.getItem(this.storageKey) ?? "{}")
  }

  persist(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
    this.ensureDataIsPersisted()
  }

  async ensureDataIsPersisted() {
    const persisted = await navigator.storage.persisted()
    if (!persisted) {
      await navigator.storage.persist()
    }
  }
}
