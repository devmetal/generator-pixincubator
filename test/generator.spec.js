var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var expect = require('chai').expect;
var testPath = path.join(__dirname, 'tmp');
var fs = require('fs');

describe('pixincubator', function(){
	describe('create a new app', function(){
		before(function(done){
			helpers.run(path.join(__dirname, '../app'))
				.withArguments(['app-name'])
				.on('end', done);
		});

		it('generated a package.json', function(){
			assert.file(['package.json']);
		});

		it('package.json contains app-name', function(){
			assert.fileContent('package.json', /app-name/ig);
		});

		it('created gulpfile', function(){
			assert.file(['gulpfile.js']);
		});

		it('created app files', function(){
			assert.file(['src/index.js', 'src/app/HelloPixi.js']);
		});

		it('created public files', function(){
			assert.file(['public/index.html', 'public/vendor/pixi.min.js']);
		});

		it('created less file', function(){
			assert.file(['src/less/main.less']);
		});

		it('created browserify shim file', function(){
			assert.file(['shim.js']);
		});
	});

	describe('howler addon test', function(){

		before(function(done){
			helpers.run(path.join(__dirname, '../app'))
				.inDir(testPath)
				.withArguments(['app-name'])
				.withPrompts({howler:'y'})
				.withPrompts({socketio:'n'})
				.on('end', done);
		});

		it('installed howler addon', function() {
			assert.fileContent('package.json', /howler/ig);
		});

		it('package.json is valid json', function(done){
			var packageFile = path.join(__dirname, 'tmp', 'app-name', 'package.json');
			fs.readFile(packageFile, function(err, content){
				expect(err).to.be.null;
				expect(function(){JSON.parse(content)}).to.not.throw(SyntaxError);
				done();
			});
		});

	});

	describe('socketio addon test', function(){
		before(function(done){
			helpers.run(path.join(__dirname, '../app'))
				.inDir(testPath)
				.withArguments(['app-name'])
				.withPrompts({howler:'n'})
				.withPrompts({socketio:'y'})
				.on('end', done);
		});

		it('installed howler addon', function() {
			assert.fileContent('package.json', /socket.io/ig);
			assert.fileContent('package.json', /socket.io-client/ig);
		});

		it('package.json is valid json', function(done){
			var packageFile = path.join(__dirname, 'tmp', 'app-name', 'package.json');
			fs.readFile(packageFile, function(err, content){
				expect(err).to.be.null;
				expect(function(){JSON.parse(content)}).to.not.throw(SyntaxError);
				done();
			});
		});
	});
});
