Pixi yeoman generator
=====================
Basic generator project for pixijs developers. This generator make able to create pixijs projects with CommonJs module loader working with browserify and babelify.

Install
-------
```bash
npm install -g yo gulp
```

Using
-----

```bash
yo pixincubator my-app
cd my-app
gulp
```
### The gulp will do
* Build the less and browserify the commonjs modules according to app
* Start the BrowserSync with the public folder
* Start watching the app js files and the less files

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
