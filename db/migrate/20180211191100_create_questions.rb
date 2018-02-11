class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.text :content, null: false
      t.string :summary, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
