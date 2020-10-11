# Palette Builder

[Live demo](https://illustrova.github.io/Palette-builder/)

A palette building tool, based on the Opium.Fill concept.

Read about the concept [in English](https://medium.com/@opium.pro/standardisation-of-color-schemes-through-the-eyes-of-a-programmer-53cc25148470), [in Russian](https://habr.com/ru/post/499202/). Author - [Denis Elianovsky](http://opium.pro/)

## Description

This is a quick tool I wrote for myself to create, import and export palette following Opium.Fill naming convention. It currently supports JSON, CSS, SASS and Stylus syntax.

## Built with

- Pug
- SCSS
- Vanilla JS
- [Parcel](https://parceljs.org/) bundler

## Getting Started

- Clone this repo: git clone <https://github.com/Illustrova/Palette-builder>
- Install dependencies: npm install
- Run one of the available scripts:
  * `npm start` - start dev server
  * `npm run build` - rebuild a project
  * `npm run deploy` - deploy a build to github

#### Parcel build notes

For a reason, build process consists of 3 tasks:

- `Clean:prebuild` just removes previously built content
- `build:parcel` is a main build process with necessary flags
- `clean:postbuild` is rather dirty but unavoidable hack to deal with parcel-scg-sprite-plugin, which leaves a bunch of empty svg and useless js files as a leftover (see [#9](https://github.com/Epimodev/parcel-plugin-svg-sprite/issues/9)). This task just removes them based on glob expression.

## License

MIT

## Authors

- [Irina Illustrova](https://github.com/illustrova)
