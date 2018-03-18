class UserSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :image_url, :questions_count, :answers_count, :full_name, :tenure

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
