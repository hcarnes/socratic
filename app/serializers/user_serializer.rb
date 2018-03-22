class UserSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :image_url, :questions_count, :answers_count, :full_name, :tenure

  has_many :answers

  def answers
    object.answers.order('created_at desc')
  end

  def questions_count
    object.questions.count
  end

  def answers_count
    object.answers.count
  end

  def tenure
    time_ago_in_words(object.created_at)
  end
end
