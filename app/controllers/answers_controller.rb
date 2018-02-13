class AnswersController < ApplicationController

  def index
    if params[:user_id]
      @answers = Answer.where(user_id: params[:user_id])
    else
      @answers = Answer.all
    end
  end

  def new
    @answer = Answer.new
  end

  def edit
    @answer = current_user.answers.find(params[:id])
    @question = @answer.question
  end

  def update
    @answer = current_user.answers.find(params[:id])
    @question = @answer.question

    if @answer.update(answer: params[:answer][:answer])
      redirect_to question_path(@question), notice: "Your answer has been updated"
    else
      render :edit
    end
  end

  def create
    @question = Question.find(params[:question_id])
    @answer = current_user.answers.build(answer: params[:answer][:answer], question_id: @question.id)

    if @answer.save
      redirect_to question_path(@question), notice: "Your answer has been recorded"
    else
      render :new
    end
  end

  def select_answer
    # users can only select answers for their own questions
    @question = current_user.questions.find(params[:question_id])
    @answer = @question.answers.find(params[:id])

    if @question.update(selected_answer_id: @answer.id)
      redirect_to question_path(@question), notice: "Your question has been marked as answered"
    else
      redirect_to question_path(@question), notice: "Sorry, something went wrong. Your answer could not be selected"
    end
  end
end
