var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('pixincubator', function(){
	describe('when create a new app', function(){
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
			assert.file(['src/index.js', 'src/app/Droid.js']);
		});
		
		it('created public files', function(){
			assert.file(['public/index.html', 'public/assets/android_icon.png', 'public/vendor/pixi.min.js']);
		});
		
		it('created less file', function(){
			assert.file(['src/less/main.less']);
		});
		
		it('created browserify shim file', function(){
			assert.file(['shim.js']);
		});
	});
	
	describe('when craete a new app with addons', function(){
		before(function(done){
			helpers.run(path.join(__dirname, '../app'))
				.withArguments(['app-name'])
				.withOptions({
					'howler':true,
					'socketio':true
				})
				.on('end', done);
		});
		
		after(function(){
			
		});
		
		it('installed howler package', function(){
			assert.fileContent('package.json', /howler/ig);
		});
		
		it('installed socketio and client', function(){
			assert.fileContent('package.json', /socket.io/ig);
			assert.fileContent('package.json', /socket.io-client/ig);
		});
		
		it('created app with howler example', function(){
			
		});
		
		it('created app with socketio example', function(){
			
		});
	});
});