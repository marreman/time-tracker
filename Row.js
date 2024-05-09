export class Row {
  constructor() {
    this.el = document.createElement("div")
    this.el.style.display = "grid"
    this.el.style.gridAutoFlow = "column"
    this.el.style.gap = "10px"
    this.el.style.marginTop = "5px"
  }

  appendChild(el) {
    this.el.appendChild(el)
  }
}
