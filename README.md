# Tigerspike Tech Task
## Author: Marcin Szczepanczyk

### Version

1.0.0


### Installation

Install the dependencies (gulp, gulp-sass, gulp-pug, gulp-concat, gulp-imagemin, gulp-uglify, del, browser-sync, typescript, gulp-typescript)

```sh
$ npm install
```

(Optional)Install gulp globally if you want to run the gulp command in your CLI.

```sh
$ npm install -g gulp
```

```sh
$ npm run start
```
to start the server

```sh
$ npm run test
```
to start karma runner and search for specs

```sh
$ npm run build
```

creates new build in 'dist' folder

```sh
$ npm run lint
```
to start typescript file linter

```sh
$ npm run no-pug
```

to compile only partials (from PUG templates perspective)


## Usage

This kit works with pug by default. You change the pug files in the pug folder and the files are compiled to html.

In the assets folder you upload the images and js files this folder will be copy to the build folder.


### Technologies used

Typescript, PUG templating engine, gulp, SASS, karma, jasmine, ts-lint
