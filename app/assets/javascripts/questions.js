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
    const profile = await profileResponse.json()
    const answersHtml = profile.answers.slice(0, 3).map(answer => answer.answer).join("<br>")

    return `<img src=${profile.image_url} width="100"><br>
    ${profile.questions_count} questions<br>
    ${profile.answers_count} answers<br>
    Latest Answers:<br>
    ${answersHtml}
    <br>
    Joined ${profile.tenure} ago`
  }

  async function updateTagList() {
    const tagsResponse = await fetch(`/tags`, {
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    })
    const tags = await tagsResponse.json()
    const optionsHtml = tags.map(tag => `<option value="${tag.name}">${tag.times_used}</option>`).join("")
    $('#tag-list').html(optionsHtml)
  }

  if ($('#tag-list').length > 0) {
    await updateTagList()
  }

  $('span.add-tag').on('click', function () {
    this.outerHTML = `<form class="add-tag" data-question-id=${this.dataset.questionId}><input name="name" placeholder="Tag Name"><input type="submit"></form>`
  })

  $(document).on('submit', '.add-tag', async function (e) {
    e.preventDefault()
    const newTagName = $(this).serialize().name
    const addTagResponse = await fetch(`/questions/${this.dataset.questionId}/tags`, {
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'same-origin',
      method: 'post'
    })
    const newTag = await addTagResponse.json()
    debugger
  })
});