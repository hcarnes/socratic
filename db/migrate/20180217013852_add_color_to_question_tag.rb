class AddColorToQuestionTag < ActiveRecord::Migration[5.1]
  def change
    add_column :question_tags, :color, :string
  end
end
