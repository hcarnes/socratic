class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user
  validates_presence_of :answer, message: "Please include an answer."
end
