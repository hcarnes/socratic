class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user
  has_one :answered_question, class_name: "Question", foreign_key: 'selected_answer_id'
  validates_presence_of :answer, message: "Please include an answer."
  before_destroy :nullify_selected_answer

  private

  def nullify_selected_answer
    question = self.answered_question
    question.update(selected_answer_id: nil) if question
  end
end
