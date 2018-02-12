class AddSelectedAnswerToQuestion < ActiveRecord::Migration[5.1]
  def change
    add_reference :questions, :selected_answer, foreign_key: {to_table: :answers}
  end
end
