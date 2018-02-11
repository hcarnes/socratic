class Question < ApplicationRecord
  belongs_to :user
  validates_presence_of :content, message: "Empty questions are not virtuous"
end
