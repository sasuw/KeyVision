# KeyVision

[Seven Principles Mobility GmbH](https://github.com/sevenprinciples) Hackathon 2023 Project to visualize keyboard shortcut configurations from multiple applications. Work in progress.

## Current state
- keyboard configurations can be read from Counter-Strike 1.6 (path hard-coded)
- frontend displays keyboard and is able to display shortcuts from CS 1.6 basically, but only as a table and not interactively

## Goals
- keyboard confiurations can be read from multiple programs and more programs can be added easily as plug-ins
- frontend displays configuration and shows used shortcut keys visually and interactivley
- shortcuts functions can be written back to proggam
- backend can be installed easily with an installer or frontend and backend are bundled e.g. as an Electron app

## For developers

### Frontend

TBD

### Backend

When you call [/applications/shortcuts/{appName}](http://localhost:3000/api-docs/#/default/get_applications_shortcuts__appName_) you get an array of [ShortCut](http://localhost:3000/jsdoc/Shortcut.html) objects. Try it out with http://localhost:3000/applications/shortcuts/exampleApp

### Docs

JS Docs in `jsdocs` directory or at http://localhost:3000/jsdoc/
API Docs: http://localhost:3000/api-docs/

### Starting the server

`node index.js`
Default port is 3000.

# Libraries used

https://github.com/kabirbaidhya/keycode-js

# Links

JavaScript Key Code: https://www.toptal.com/developers/keycode
