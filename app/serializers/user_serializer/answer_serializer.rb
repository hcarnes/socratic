class UserSerializer::AnswerSerializer < ActiveModel::Serializer
  include ActionView::Helpers::TextHelper
  attributes :answer

  def answer
    truncate(object.answer, length: 25)
  end
end