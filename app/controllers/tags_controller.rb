class TagsController < ApplicationController

  def index
    render json: Tag.all
  end

  def create
    if params[:question_id]
      question = current_user.questions.find(params[:question_id])
      tag = Tag.find_or_initialize_by(name: params[:name])
      question.tags << tag
      render json: tag
    end
  end
end