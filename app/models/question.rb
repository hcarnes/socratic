class Question < ApplicationRecord
  belongs_to :user
  belongs_to :selected_answer, class_name: "Answer", optional: true
  has_many :answers
  has_many :question_tags
  has_many :tags, through: :question_tags

  validates_presence_of :content, message: "Empty questions are not virtuous"
  validates_presence_of :summary, message: "Brevity is the soul of wit, so summary is required"

  def tag_names
    self.tags.map(&:name).join(", ")
  end

  def tag_names=(names)
    self.tags = names.split(",").map(&:strip).map do |name|
      Tag.find_or_initialize_by(name: name)
    end
  end
end
