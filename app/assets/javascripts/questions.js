document.addEventListener("DOMContentLoaded", async function () {
  // Setup popover to show on hover over profile links
  $(".user-info-popover").popover({
    trigger: 'hover',
    placement: 'right',
    content: "Loading...",
    html: true
  })

  // When popover is shown, replace the "Loading..." content with user profile
  $(".user-info-popover").on('shown.bs.popover', async function () {
    const po = $(this).data()['bs.popover']
    po.config.content = await renderUserProfile.call(this)
    po.setContent()
  })

  // Fetch user JSON from server and return html
  async function renderUserProfile() {
    const userId = this.dataset.userId
    const userProfile = await User.getById(userId)

    return userProfile.profilePopupHtml()
  }

  // Get lists of tags from server and render into #tag-list datalist
  async function updateTagList() {
    const tags = await Tag.all()
    const optionsHtml = tags.map(tag => tag.asOptionHtml()).join("")

    $('#tag-list').html(optionsHtml)
  }

  // Only run above function if there is a #tag-list element on the page
  if ($('#tag-list').length > 0) {
    await updateTagList()
  }

  // Listens for clicks on the add-tag icon, replaces icon with form for adding new tag
  $(document).on('click', 'span.add-tag', function () {
    this.outerHTML = `<form class="add-tag" data-question-id=${this.dataset.questionId}><input autofocus name="name" placeholder="Tag Name"><input type="submit"></form>`
  })

  // Add tag to question, add it to page, then replace form with the add-tag icon again
  $(document).on('submit', '.add-tag', async function (e) {
    e.preventDefault()
    const formData = new FormData(this)
    const newTag = await Tag.addTagToQuestion(this.dataset.questionId, formData)
    document.querySelector(".question-tags").innerHTML += ", " + newTag.asHtml()
    this.outerHTML = `<span class="add-tag" data-question-id="${this.dataset.questionId}">&#x2795;</span>`
  })

  $('.delete-tag').on('click', function () {
    const parent = this.parentElement
    parent.parentElement.removeChild(parent)
  })
});