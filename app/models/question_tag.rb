class QuestionTag < ApplicationRecord
  belongs_to :tag
  belongs_to :question
  delegate :name, to: :tag, allow_nil: true
end
