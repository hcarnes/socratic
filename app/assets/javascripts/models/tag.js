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

  static async all() {
    const tagsResponse = await fetch(`/tags`, {
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    const tags = (await tagsResponse.json()).map(tagObject => new Tag(tagObject))
    return tags
  }

  static async addTagToQuestion(questionId, newTagFormData) {
    const addTagResponse = await fetch(`/questions/${questionId}/tags`, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      credentials: 'same-origin',
      method: 'post',
      body: newTagFormData
    })

    return new Tag(await addTagResponse.json())
  }
}