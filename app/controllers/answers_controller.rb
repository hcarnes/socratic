class AnswersController < ApplicationController

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
