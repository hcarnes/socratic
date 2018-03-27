class Tag {

  constructor({
    name
  }) {
    this.name = name
  }

  asHtml() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `<span style="color: #${randomColor}">${this.name}</span>`
  }
}