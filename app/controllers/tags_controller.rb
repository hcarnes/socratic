class TagsController < ApplicationController

  def index
    render json: Tag.all
  end
end