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
    const userProfile = await User.getById(userId)

    return userProfile.profilePopupHtml()
  }

  async function updateTagList() {
    const tags = await Tag.all()
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
    const newTag = await Tag.addTagToQuestion(this.dataset.questionId, formData)

    document.querySelector(".question-tags").innerHTML += ", " + newTag.asHtml()
    this.outerHTML = `<span class="add-tag" data-question-id="${this.dataset.questionId}">&#x2795;</span>`
  })
});