# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project - Installed Rails gem and generated new rails app.
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) A question has many answers.
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) An answer belongs to a question.
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) - A question has many tags through question_tags.
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) - Users can submit question tags.
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item) - Validates presence of question content and summary when user submites question. Validates presence of an answer when user submits an answer.
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) I created a search feature that searches the question, content, and tags. The search method is in the Question model.
- [x] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item) 
http://localhost:3000/questions/3/answers/4/edit
- [x] Include signup (how e.g. Devise) Devise
- [x] Include login (how e.g. Devise) Devise
- [x] Include logout (how e.g. Devise) Devise
- [x] Include third party signup/login (how e.g. Devise/OmniAuth) OmniAuth/Google
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
- [x] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate