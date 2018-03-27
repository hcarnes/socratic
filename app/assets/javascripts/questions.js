document.addEventListener("DOMContentLoaded", async function () {
  $(".user-info-popover").popover({
    trigger: 'hover',
    placement: 'right',
    content: "Loading...",
    html: true
  })

  $(".user-info-popover").on('shown.bs.popover', async function () {
    const po = $(this).data()['bs.popover']
    po.config.content = await renderUserProfile.call(this)
    po.setContent()
  })

  async function renderUserProfile() {
    const userId = this.dataset.userId
    const profileResponse = await fetch(`/users/${userId}`, {
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    const userProfile = new User(await profileResponse.json())

    return userProfile.profilePopupHtml()
  }

  async function updateTagList() {
    const tagsResponse = await fetch(`/tags`, {
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    const tags = (await tagsResponse.json()).map(tagObject => new Tag(tagObject))
    const optionsHtml = tags.map(tag => tag.asOptionHtml()).join("")
    $('#tag-list').html(optionsHtml)
  }

  if ($('#tag-list').length > 0) {
    await updateTagList()
  }

  $(document).on('click', 'span.add-tag', function () {
    this.outerHTML = `<form class="add-tag" data-question-id=${this.dataset.questionId}><input autofocus name="name" placeholder="Tag Name"><input type="submit"></form>`
  })

  $(document).on('submit', '.add-tag', async function (e) {
    e.preventDefault()
    const formData = new FormData(this)
    const addTagResponse = await fetch(`/questions/${this.dataset.questionId}/tags`, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      credentials: 'same-origin',
      method: 'post',
      body: formData
    })
    const newTag = new Tag(await addTagResponse.json())
    document.querySelector(".question-tags").innerHTML += ", " + newTag.asHtml()
    this.outerHTML = `<span class="add-tag" data-question-id="${this.dataset.questionId}">&#x2795;</span>`
  })
});