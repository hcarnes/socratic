module ApplicationHelper

  def colored_tags(question_tags)
    if question_tags.any?
      content_tag(:small) do
        "Tags: ".html_safe +
        question_tags.map do |qt|
          content_tag(:span, qt.name, style: "color: #{qt.color}")
        end.join(', ').html_safe
      end
    end
  end
end
