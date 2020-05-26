
<div align='center'>
  <img width='300' alt='mazuma-maker' src='/public/mazumalogotr.png'/>
  <br/>
  <br/>
  
  <strong>
  a customized financinal planner with data visualization
  </strong>
  <br/>
  <br/>
  </div>
  
# Mazuma Maker

_Good financial planning made simple come_

Looking to find a simple way to track your finances? 
Mazuma Maker is the perfect solution for you!

## Setup

 You'll need to take the following steps:

* Fork or clone this repo.
* Run the following commands:

```
npm install

```

## Set up Plaid API


For complete information about the API, head
to the Plaid documentation https://plaid.com/docs.

All endpoints require a valid `client_id`, `secret`, and `public_key` to
access and are accessible from a valid instance of a Plaid `Client`

Once you receive those keys place them in the secrets.js file in your root directory.

## Victory.js 

Victory.js is an ecosystem of composable React components for building interactive data visualizations. 

For complete information about Victory, head
to the Victory.js documentation https://formidable.com/open-source/victory/docs/

Victory.js is used to make all the graphs in Mazuma Maker.


## React/Redux 

React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.

For more information about React/Redux, head
to the React/Redux documentation https://react-redux.js.org/

React/Redux is used to render user's personal financial data on the front-end.


## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json` and
  `.travis.yml` files
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):

```
export MY_APP_NAME=mazuma-maker
createdb $MY_APP_NAME
createdb $MY_APP_NAME-test
```

* By default, running `npm test` will use `mazuma-maker-test`, while
  regular development uses `mazuma-maker`
* Create a file called `secrets.js` in the project root
  * This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  * Its purpose is to attach the secret environment variables that you
    will use while developing
  * However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

Mazuma Maker comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." However, everyone has
their own style, so we recommend that you and your team work out yours
and stick to it. Any linter rule that you object to can be "turned
off" in `.eslintrc.json`. You may also choose an entirely different
config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment! There are two
supported ways to deploy:

* automatically, via continuous deployment with Travis.
* "manually", from your local machine via the `deploy` script.

Either way, you'll need to set up your deployment server to start.
The steps below are also covered in the CI/CD workshop.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

### Travis

_**NOTE**_ that this step assumes that Travis-CI is already testing your code.
Continuous Integration is not about testing per se – it's about _continuously
integrating_ your changes into the live application, instead of periodically
_releasing_ new versions. CI tools can not only test your code, but then
automatically deploy your app. This is known as Continuous Deployment.
Mazuma Maker comes with a `.travis.yml` configuration almost ready for
continuous deployment; follow these steps to the job.

1.  Run the following commands to create a new branch:

```
git checkout master
git pull
git checkout -b f/travis-deploy
```

2.  Run the following script to finish configuring `travis.yml` :
    `npm run heroku-token`
    This will use your `heroku` CLI (that you configured previously, if
    not then see [above](#Heroku)) to generate an authentication token. It
    will then use `openssl` to encrypt this token using a public key that
    Travis has generated for you. It will then update your `.travis.yml`
    file with the encrypted value to be sent with the `secure` key under
    the `api_key`.
3.  Run the following commands to commit these changes

```
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```

4.  Make a Pull Request for the new branch, get it approved, and merge it into
    the master branch.

_**NOTE**_ that this script depends on your local `origin` Git remote matching
your GitHub URL, and your local `heroku` remote matching the name of your
Heroku app. This is only an issue if you rename your GitHub organization,
repository name or Heroku app name. You can update these values using
`git remote` and its related commands.

#### Travis CLI

There is a procedure to complete the above steps by installing the official
[Travis CLI tools][travis-cli]. This requires a recent Ruby, but this step
should not be, strictly speaking, necessary. Only explore this option when the
above has failed.

[travis-cli]: https://github.com/travis-ci/travis.rb#installation

That's it! From now on, whenever `master` is updated on GitHub, Travis
will automatically push the app to Heroku for you.


Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!
