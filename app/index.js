var generators = require('yeoman-generator');
var _ = require('lodash');

var copyAppFiles = function() {
	this.fs.copy(
		this.templatePath('index.js'),
		this.destinationPath('src/index.js')
	);
	
	this.fs.copy(
		this.templatePath('app/Droid.js'),
		this.destinationPath('src/app/Droid.js')
	);
};

var copyLessFile = function() {
	this.fs.copy(
		this.templatePath('less/main.less'),
		this.destinationPath('src/less/main.less')
	);
};

var copyGulpFile = function() {
	this.fs.copy(
		this.templatePath('gulp/gulpfile.js'),
		this.destinationPath('gulpfile.js')
	);
};

var copyPublicFiles = function() {
	this.fs.copyTpl(
		this.templatePath('public/index.html'),
		this.destinationPath('public/index.html'),
		{title: this.appname}
	);
	
	this.fs.copy(
		this.templatePath('public/assets/android_icon.png'),
		this.destinationPath('public/assets/android_icon.png')
	);
};

var copyPackageJson = function() {
	this.fs.copyTpl(
		this.templatePath('package.json'),
		this.destinationPath('package.json'),
		{appName: this.appname}
	)
}

module.exports = generators.Base.extend({
	
	constructor: function() {
		generators.Base.apply(this, arguments);
		this.argument('appname', {type:String, required:true});
		this.appname = _.escape(this.appname);
	},
	
	writing: function() {
		this.destinationRoot('./' + this.appname);
		
		copyAppFiles.apply(this);
		copyLessFile.apply(this);
		copyPublicFiles.apply(this);
		copyGulpFile.apply(this);
		copyPackageJson.apply(this);
	},
	
	install: function() {
		this.npmInstall();
	}
});