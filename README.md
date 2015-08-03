[![Build Status](https://travis-ci.org/devmetal/generator-pixincubator.svg?branch=master)](https://travis-ci.org/devmetal/generator-pixincubator)

Pixi yeoman generator
=====================
Basic generator project for pixijs developers. This generator allows to create pixijs projects wich use browserify and babelify (because of es6).

Install
-------
```bash
npm install -g yo gulp generator-pixincubator
```

Using
-----

```bash
yo pixincubator my-app
cd my-app
gulp
```
### The gulp will do
* Build the less and browserify the app.
* Start the BrowserSync with the files from the public folder
* Start watching the apps js files and the less files

Scaffolding
-----------
The generatow will create this structure
* my-app
  * public
    * assets
      * android_icon.png
    * vendor
      * pixi.min.js
    * index.html
  * src
    * app
      * Droid.js (example)
    * less
      * main.less
    * index.js (browserify entry point)
  * gulpfile.js
  * package.json
  * shim.js
