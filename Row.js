export class Row {
  constructor() {
    this.el = document.createElement("div")
    this.el.style.display = "flex"
    this.el.style.gap = "10px"
  }

  appendChild(el) {
    this.el.appendChild(el)
  }
}
