# Seamless Server
this is the server application for Seamless.

## Getting Started
this section describes common scripts that can be used.

  - continuously build and serve: `npm start`.
  - continuously test: `npm test`.
  - continuously document: `npm run doc`.
  - build app: `npm run build`.
  - test once: `npm run test:once`.
  - create docs: `npm run doc:once`.
  - deploy app: `npm run deploy`.
  - update dependancies: `npm i`.

## Source Structure
this section describes the structure we will be using.

### main.js
  - This is where all endpoints will be registered with the server app.

### endpoints
  - Each folder in endpoints will encompass its own:
    router, controller/s (for CRUD), and model.

### libs
  - any business heavy logic should be lifted from the endpoint
    and refactored in libs as to keep code clean.

## Testing
testing will be conducted using avajs. specs will be placed in the
same directory as the code they are testing and will be noted as '/spec.js/'.


## Code Style
to maintain code style we will be using es-lint in combination with
the airbnb base configurations.


## Documentation
to generate documentation we are using esdocs. please see
[here](https://esdoc.org/tutorial.html). Also it is worth looking for a editor
plugin to help generate templates for docs (for atom try: atom-easy-jsdoc. it
doesnt work perfectly but atleast decent).
