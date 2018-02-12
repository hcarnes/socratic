class AddSelectedAnswerToQuestion < ActiveRecord::Migration[5.1]
  def change
    add_reference :questions, :selected_answer, foreign_key: true
  end
end
