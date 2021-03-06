class Question < ApplicationRecord
  belongs_to :user
  belongs_to :selected_answer, class_name: "Answer", optional: true
  has_many :answers, dependent: :destroy
  has_many :question_tags, autosave: true, dependent: :destroy
  has_many :tags, through: :question_tags

  validates_presence_of :content, message: "Empty questions are not virtuous"
  validates_presence_of :summary, message: "Brevity is the soul of wit, so summary is required"
  
  def self.search(query)
    distinct.left_outer_joins(:tags).where("summary LIKE :query OR content LIKE :query OR tags.name LIKE :query", query: "%#{query}%")
  end

  def self.answered
    where("selected_answer_id IS NOT NULL")
  end

  def question_tags_attributes=(attrs)
    # Mark any existing question tags for destruction, so they can be replaced by the freshly built tags on save
    self.question_tags.each(&:mark_for_destruction)

    # convert attrs hash to array of values, then look through array of tags submitted by the user
    # and remove the ones that have a blank color or tag name
    attrs.values.reject {|x| x["name"].blank? || x["color"].blank? }.each do |tag_color_hash|
      tag = Tag.find_or_initialize_by(name: tag_color_hash["name"])
      self.question_tags.build(tag: tag, color: tag_color_hash["color"])
    end
  end
end
