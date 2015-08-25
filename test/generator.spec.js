var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var expect = require('chai').expect;

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
	
	describe('Addons npmInstall test', function(){	
		beforeEach(function(done){
			helpers.testDirectory(path.join(__dirname, 'tmp'), function(err){
				if (err) {
					done(err);
					return;
				}
				
				this.app = helpers.createGenerator('pixincubator', [
					'../../app'
				], 'app-name');
				
				this.npmCalls = [];
				
				this.app.npmInstall = function() {
					this.npmCalls.push(arguments);
				}.bind(this);
				
				done();
			}.bind(this));
		});
		
		it('install howler addon', function(done) {
			helpers.mockPrompt(this.app, {
				howler:'y'
			});
			
			this.app.run(function(){
				expect(this.npmCalls[0][0]).to.deep.equal(['howler']);
				expect(this.npmCalls[0][1]).to.deep.equal({'save':true});
				done();
			}.bind(this));
		});
		
		it('install socketio addon', function(done) {
			helpers.mockPrompt(this.app, {
				socketio:'y'
			});
			
			this.app.run(function(){
				expect(this.npmCalls[0][0]).to.deep.equal(['socket.io', 'socket.io-client']);
				expect(this.npmCalls[0][1]).to.deep.equal({'save':true});
				done();
			}.bind(this));
		});
	});
});