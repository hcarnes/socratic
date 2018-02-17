class QuestionsController < ApplicationController

  def index
    if params[:search].present?
      @questions = Question.search(params[:search])
    else
      @questions = Question.all
    end
  end

  def answered
    @questions = Question.answered

    render :index
  end

  def new
    @question = Question.new
    @question_tags = 3.times.map {@question.question_tags.build}
  end

  def create
    @question = current_user.questions.build(permitted_question_params)

    if @question.save
      redirect_to question_path(@question), notice: "Your question has been submitted"
    else
      render :new
    end
  end

  def show
    @question = Question.find(params[:id])
    @answer = Answer.new
  end

  private

  def permitted_question_params
    params.require(:question).permit(:content, :summary, :tag_names, question_tags_attributes: [:name, :color])
  end
end
