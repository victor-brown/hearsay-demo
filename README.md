# To use the appplication:
## from machine
> You need to have at leas node v16.4.1 installed

Run the following commands:

- $ `npm i`
- $ `npm run start:dev`
  
or

- $ `npm i`
- $ `npm run build`
- $ `node dist/src/index.js`

## with docker
> You can find my published image here: https://hub.docker.com/r/victorbrown/hearsay-demo
- $ `docker pull victorbrown/hearsay-demo:v1.0`
- $ `docker run -p 3000:3000 victorbrown/hearsay-demo:v1.0`
