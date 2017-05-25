# plotsbot
A bot for Public Lab

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

Now that you're ready, run the bot by running the command, `node bot.js`

## Contributing

### Versioning

We use Semantic Versioning for maintaining versions for the git tag and npm package version. Please adhere to it strictly and visit their website for more information:   http://semver.org/

* In order to increment MAJOR version, use `npm version major`
* In order to increment MINOR version, use `npm version minor`
* In order to increment PATCH version, use `npm version patch`

In order to help you decide which version to bump to, issues will be labelled appropriately as far as possible.
