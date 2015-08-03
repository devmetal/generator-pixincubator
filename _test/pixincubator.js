var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('pixincubator', function(){
	describe('When create a new app', function(){
		before(function(done){
			helpers.run(path.join(__dirname, '../app'))
				.inDir(path.join(__dirname, './tmp'))
				.withArguments(['app-name'])
				.on('end', done);
		});
		
		it('Created package.json and gulpfile', function(){
			assert.file(['package.json', 'gulpfile.json']);
		});
	});
});