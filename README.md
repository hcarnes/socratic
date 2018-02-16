<img src="https://github.com/hcarnes/socratic/raw/master/public/logo.png" alt="Thoughtful Cat (Logo)" width="130">

# Socratic

A Q&A application for small organizations.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Installation

Create a Google OAuth Client token, using `http://<yourappdomain>/users/auth/google_oauth2/callback` as the client
redirect URI, and set the credentials to `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables.
Make sure that you enable access to the Google Plus API and the Google Contacts API, as those are required to make
Login via Google work.

### One click login

Socratic supports one click deploy to Heroku, just click the image above and have your OAuth credentials handy.

### Local development

Begin by running `bundle install`. Ensure configuration is correct in `database.yml` and run `rake db:create`
followed by `rake db:migrate`. You should then be able to start the Rails server with `rails s`, and login with Google.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/hcarnes/socratic. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The app is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the socratic codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/sinatra-final-project-hcarnes/blob/master/CODE_OF_CONDUCT.md).