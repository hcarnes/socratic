class Tag {

  constructor(tagAttributes) {
    Object.assign(this, tagAttributes)
  }

  asHtml() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `<span style="color: #${randomColor}">${this.name}</span>`
  }

  asOptionHtml() {
    return `<option value="${this.name}">${this.times_used}</option>`
  }
}