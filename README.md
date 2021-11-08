# Desition-CLI

This a CLI/Helper for the org Desition devs, to help making things more faster.

## Install

> You can use NPM or Yarn

```js
npm i @dinels/desition-cli
```

or

```js
yarn add @dinels/desition-cli
```

## Usage

First you have to initialize the Class constructor and pass the required parameters.

```ts
const genInterfacesFiles = new GenerateFiles({
  routePath: './**/interfaces/**/*.interface.ts', // This is the route where will search the files.
  savePath: __dirname + '/Interfaces', // This is the route where is going to save the output
  suffixStart: 'I', // You can change the Start Suffix using this key.
  typeSuffix: '.ts', // The type suffix to replace at the end
});
```

## Find the matching Files

With this function you can find all the desire files that match are under `routePath`

```ts
const files = await genInterfacesFiles.inspectFiles(); // returns a string[] with the files location.
```

## Generate Interfaces Indexes

To generate the files you have to run the function.

```ts
await genInterfacesFiles.generateInterfaces(
  'index.ts', // output name of the file on the savePath location
  './test/', // the exclude name to delete on output
  files // the files to process
);
// Run this command
```

## Generate Models Indexes

example:

```ts
await genInterfacesFiles.generateModels(
  'index.ts', // output name of the file on the savePath location
  './test/', // the exclude name to delete on output
  files // the files to process
);
```

## Thanks for using
