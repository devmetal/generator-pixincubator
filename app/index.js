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
	
	constructor: function() {
		generators.Base.apply(this, arguments);
		
		this.argument('appname', {type:String, required:true});
		this.appname = _.escape(this.appname);
		this.addons = [];
	},
	
	prompting: function() {
		var keys = Object.keys(definedAddons);
		
		var prompts = keys.map(function(addon){
			return {
				type:'input',
				name:addon,
				message:'Would you like use the ' + addon + ' addon (y\n)',
				default:'n'
			}
		});
		
		var done = this.async();
		this.prompt(prompts, function(answers){
			keys = Object.keys(answers);
			
			keys.forEach(function(addon){
				var answer = answers[addon];
				if (answer === 'y' || answer === 'Y') {
					this.addons.push(addon);
				}
			}.bind(this));
			
			done();
			
		}.bind(this));
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
		var self = this;
		
		this.addons.forEach(function(addon){
			var npmPackage = definedAddons[addon]['package'];
			if (_.isArray(npmPackage)) {
				self.npmInstall(npmPackage, {'save':true});
			} else {
				self.npmInstall([npmPackage], {'save':true});	
			}
		});
		
		this.npmInstall();
	}
});