# Il sito di Ventuno Podcast

Il sito ufficiale di [Ventuno](https://ventuno.space).

![Build](https://github.com/ventunobtc/ventuno.space/workflows/build/badge.svg)

## Content

The content can be edited via the JSON files in the [content directory](./content).

## Local build

[Node.js](https://nodejs.org/en/) is a prerequisite, the dependencies are managed via npm.
Once you have cloned this repo, you can setup the packages:

```bash
npm install
```

Create a build and rebuild on file change:

```bash
npm start
```

This will bring up the dev server on [localhost:3000](http://localhost:3000).

## Episode download

Download all episode mp3 and image files:

```bash
EPISODES_DIR=./episodes npm run episodes
```
