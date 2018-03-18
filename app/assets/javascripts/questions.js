// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(() => {
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


    return `<img src=${profile.image_url} width="100">`
  }
})