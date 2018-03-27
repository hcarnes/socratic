class User {
  constructor(userAttributes) {
    Object.assign(this, userAttributes) // Copy User attributes to model
  }

  // Get top 3 answers
  topAnswers() {
    return this.answers.slice(0, 3).map(answer => answer.answer)
  }

  profilePopupHtml() {
    const answersHtml = this.topAnswers().join("<br>")

    return `<img src=${this.image_url} width="100"><br>
    ${this.questions_count} questions<br>
    ${this.answers_count} answers<br>
    Latest Answers:<br>
    ${answersHtml}
    <br>
    Joined ${this.tenure} ago`
  }
}