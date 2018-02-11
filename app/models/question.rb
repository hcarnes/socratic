class Question < ApplicationRecord
  belongs_to :user
  has_many :answers
  validates_presence_of :content, message: "Empty questions are not virtuous"
  validates_presence_of :summary, message: "Brevity is the soul of wit, so summary is required"
end
