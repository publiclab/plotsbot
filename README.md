# plotsbot
[![Build Status](https://travis-ci.org/publiclab/plotsbot.svg?branch=master)](https://travis-ci.org/publiclab/plotsbot)
[![license](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com/)

A bot for Public Lab

plotsbot is an integrated system for bots across various interfaces, such as in an IRC chatroom, in GitHub issues, or on PublicLab.org. The bot consists of a set of behaviors, like "Greet" or "Help" (see below) which can work on one or more interface.

**Where can I test it out?**  
Currently, the bot lives in `#publiclab-testing` on OFTC or on [`#publiclab-testing` on Matrix](https://riot.im/app/#/room/#publiclab-testing:matrix.org).

## Interfaces

The various interfaces of plotsbot allow it to interact with various resources online and locally. As of now, plotsbot interacts with one resource at a time, but in the future multiple interfaces can be supported simultaneously.

There are two types of interfaces:
1. Private Interfaces where one to one conversations take place between the user and plotsbot. Each message sent by the user is meant for plotsbot and vice versa and should be interpreted as such.
2. Public Interfaces where many to one conversation takes place between a number of users and plotsbot. Each message sent by a user might or might not be meant for a specific other user (or plotsbot), and thus each message meant for plotsbot should consider its name explicitly.

### IRC

This interface allows plotsbot to interact with users on IRC. In production, plotsbot connects to #publiclab channel on the OFTC IRC network. For testing purposes, technically the bot can be made to connect to any possible channel but #publiclab-testing on OFTC is dedicated towards the purpose of testing the bot.

IRC classifies as both a public and a private interface as the general IRC channel acts as a public interface to the bot while a user can DM the bot which would act as a private interface to the bot.

This is the default interface for plotsbot.

### CLI

This interface allows you to experiment on the bot locally and interact with it on the command line interface instead of an actual IRC channel. Think of this interface as a sandbox to test features out on your local machine.

CLI is a private interface. You do not need to mention the bot in each message you send because it is implied that any message you send is meant for the bot.

This interface can be used instead of the default interface by setting the environment variable `TEST` to `true`.

#### Example:

```
➜  plotsbot git:(master) TEST=true node bot.js
Bot is running in testing mode.
[ryzokuken => plotsbot-ryzokuken]
help
[plotsbot-ryzokuken => ryzokuken]
# chatbot
`plotsbot-ryzokuken help [<module>...]`: Prints out this descriptive help message for each mentioned module. If no modules are specified, print the help message for ALL modules.`chatbot` is not the name of a valid module. Try looking up the `chatbot` module instead.
```

## Behavior Model

1. `trigger: String` => The event on which the behavior is supposed to be triggered. Currently, two events are supported - the `join` event which is triggered whenever a new user joins a particular channel, and the `message` event whenever a particular user sends a message on a channel.
2. `action: Function` => This is the action of the behavior which is called by the bot at the appropriate moment. The bot provides the function with different arguments depending on the corresponding behavior's `trigger` value. For behaviors with `trigger` equal to `join`, the bot passes three arguments to the action function upon trigger. These are:

    1. `channel: String` => This is the name of the channel on which the user joined.
    2. `username: String` => This is the username of the new user.
    3. `botNick: String` => This is the username of the bot.

    On the other hand, for behaviors with `trigger` equal to `message`, the bot passes two arguments to the action function. These are:

    1. `botNick: String` => This is the username of the bot.
    2. `options: Array` => This is an array containing additional options provided by the user.

    This function may return a result string which will be sent back to the user in a message, or a promise that will eventually yield such a string.

3. `keyword: String` **(Only required for message triggered behaviors)** => This is the keyword that must be present in the message in order for the bot to call the behavior's action function.

## Behaviors

Behaviors are clearly defined tasks performed by the bot. A behavior may use any third-party functions to perform this action, but it needs to expose a few mandatory fields that are used by the chatbot to trigger the behavior at the appropriate time.

A behavior may export an object of type `Behavior` or a factory function that returns such an object. These factory functions come into play when you want a shared state between multiple behaviors. For example: If you have multiple behaviors that make use of a database, there is no need to get a database connection individually for each such behavior.

### Greet
`trigger` **join**

The bot greets users when they join the channel.

### Help
`trigger` **message**  
`keyword` **help**

Prints out the help messages of the modules whose names have been specified. If no modules were mentioned, all modules are explained.

### First Timers Only
`trigger` **message**  
`keyword` **fto**

Prints out all the issues in the specified publiclab repositories labelled 'first-timers-only'. If no repositories are mentioned, the user is asked to do so.

## Dependencies

### 1. NVM
You do not need NVM in order to install Node JS, but if you're running Linux, chances are that the version of Node JS available in the repositories is too old to be usable. Therefore, we suggest you to use NVM in order to make the most out of the newest versions of Node JS.

Go to https://github.com/creationix/nvm#install-script to obtain the NVM installation script.

### 2. Node JS and npm
In order to install the latest version of Node JS and npm, run `nvm install node`

### 3. Yarn (Optional)
We suggest you to use yarn to install and maintain npm packages, as it is faster and more efficient than vanilla npm. In order to install yarn, run `npm install -g yarn`

### 4. Node Modules
In order to install all node modules the package depends on, just run `yarn` or `npm install` (in case you chose not install yarn)

## Setup

1. Copy the sample configuration at `config.js.sample` by running `cp config.js.sample config.js`
  1. Let the channel and server remain to be `#publiclab-testing` and OFTC respectively. This is the ideal channel you would like to test your changes on. I repeat, **DO NOT** change the channel and server unless you know exactly what you're doing and without the consent of the owner of the respective channel.
  2. Change the name attribute to something unique. `plotsbot-${your-username-here}` sounds very indicative and would help you differentiate your local instance from other instances of the bot.

## Run

Now that you're ready, run the bot by running the command, `node bot.js`.

In development, running the bot using nodemon is recommended. Install nodemon by running `npm install -g nodemon` or `yarn global add nodemon` and then execute the bot using `nodemon bot.js`. Nodemon will listen for changes to the files and rerun the bot automatically whenever you make a change.

## Experimentation

In order to experiment locally on the bot, you need to set the `TEST` environment variable to be true. Running the bot using `TEST=true node bot.js` will work.

## Contributing

### Versioning

We use Semantic Versioning for maintaining versions for the git tag and npm package version. Please adhere to it strictly and visit their website for more information:   http://semver.org/

* In order to increment MAJOR version, use `npm version major`
* In order to increment MINOR version, use `npm version minor`
* In order to increment PATCH version, use `npm version patch`

In order to help you decide which version to bump to, issues will be labelled appropriately as far as possible.

You need to bump the version only for the source files pertaining to the project and not for documentation and other configuration files. As a rule of thumb, bump the version if your commit involves making changes to a file with the `.js` extension.

### Code styling
We use [ESLint](http://eslint.org) for linting our codebase. Run `yarn lint` or `npm run-script lint` for checking lint errors. Most common errors can be fixed by running `yarn lint-fix` or `npm run-script lint-fix`. Code styling is an important part of writing good code to the make the code more readable and meaningful. We follow the latest ES6 standards for our codebase. Make sure you run the lint checks before submitting a PR so that there are no CI build failures.  

### Testing

We use [Jasmine](https://jasmine.github.io/) for testing our code. Run `yarn test` or `npm test` to run tests locally before committing your changes.
