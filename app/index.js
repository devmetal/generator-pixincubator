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
	
	this.fs.copy(
		this.templatePath('public/vendor/pixi.min.js'),
		this.destinationPath('public/vendor/pixi.min.js')
	);	
};

var copyShim = function() {
	this.fs.copy(
		this.templatePath('shim.js'),
		this.destinationPath('shim.js')
	);
};

var copyPackageJson = function() {
	this.fs.copyTpl(
		this.templatePath('package.json'),
		this.destinationPath('package.json'),
		{appName: this.appname}
	)
};

var definedAddons = {
	socketio:{
		'package':[
			'socket.io',
			'socket.io-client'
		]
	},
	howler:{
		'package':'howler'
	}
}

module.exports = generators.Base.extend({
	
	initAddonByOption: function(name) {
		this.addons = this.addons || [];
		this.option(name);
		if (this.options[name]) {
			this.addons.push(name);
		}
	},
	
	constructor: function() {
		generators.Base.apply(this, arguments);
		
		this.argument('appname', {type:String, required:true});
		this.appname = _.escape(this.appname);
		
		this.initAddonByOption('howler');
		this.initAddonByOption('socketio');
	},
	
	writing: function() {
		
		this.destinationRoot('./' + this.appname);
		
		copyAppFiles.apply(this);
		copyLessFile.apply(this);
		copyPublicFiles.apply(this);
		copyShim.apply(this);
		copyGulpFile.apply(this);
		copyPackageJson.apply(this);
	},
	
	install: function() {
		this.npmInstall();
		
		var self = this;
		this.addons.forEach(function(addon){
			var npmPackage = definedAddons[addon];
			if (_.isArray(npmPackage)) {
				self.npmInstall(npmPackage, {'save':true});
			} else {
				self.npmInstall([npmPackage], {'save':true});	
			}
		});
	}
});