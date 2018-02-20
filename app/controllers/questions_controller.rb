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
    3.times.map {@question.question_tags.build(color: "#FEC30A")}
  end

  def edit
    @question = current_user.questions.find(params[:id])
  end

  def update
    @question = current_user.questions.find(params[:id])

    if @question.update(permitted_question_params)
      redirect_to question_path(@question), notice: "Your question has been updated"
    else
      render :edit
    end
  end

  def create
    @question = current_user.questions.build(permitted_question_params)

    if @question.save
      redirect_to question_path(@question), notice: "Your question has been submitted"
    else
      (3 - @question.question_tags.size).times.map {@question.question_tags.build(color: "#FEC30A")}
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
