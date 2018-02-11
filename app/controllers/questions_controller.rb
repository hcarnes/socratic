class QuestionsController < ApplicationController

  def index
    @questions = Question.all
  end

  def new
    @question = Question.new
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

  def submit_answer
    @question = Question.find(params[:id])
    @answer = current_user.answers.build(answer: params[:answer][:answer], question_id: @question.id)

    if @answer.save
      redirect_to question_path(@question), notice: "Your answer has been recorded"
    else
      render :show
    end
  end

  private

  def permitted_question_params
    params.require(:question).permit(:content, :summary)
  end
end
