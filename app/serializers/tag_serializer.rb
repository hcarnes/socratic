class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :times_used

  def times_used
    object.questions.count
  end
end
