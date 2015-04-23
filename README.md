Popayan.js Automation Example
=====

Clone this repo and then run `npm install`

## What do we need?


- http://git-scm.com/downloads
- https://nodejs.org/download/
- https://github.com/brigade/scss-lint
- http://jshint.com/install/
- http://gruntjs.com/getting-started#installing-the-cli
- http://rubyinstaller.org/
- http://www.browsersync.io

## Grunt Tasks

#### Development
- `grunt quality` Code quality check (`*.js` - `*.scss`)
- `grunt server` Runs a development server using BrowserSync

#### Build
- `grunt prepare` Prepare everything for the build
- `grunt testBuild` Test latest build
- `grunt build` Create the build - Commit Changes - Push changes to github. It creates a minor version change. `0.0.1 -> 0.0.2`
- `grunt build --deployVersion=major` Creates a major version. `0.0.1 -> 1.0.0`

## Want to contribute?
*Send a Pull Request!*

