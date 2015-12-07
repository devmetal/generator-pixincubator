'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

var copyAppFiles = function() {
	this.fs.copy(
		this.templatePath('index.js'),
		this.destinationPath('src/index.js')
	);

	this.fs.copy(
		this.templatePath('app/HelloPixi.js'),
		this.destinationPath('src/app/HelloPixi.js')
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
	var dependencies = "";
	if (!!this.addons.length) {
		dependencies = this.addons.map(addon => {
			var packages = this.definedAddons[addon]['package'];
			return packages.map(pck => "\"" + pck.name + "\":\"" + pck.v + "\"").join(',\n');
		}).join("");
	}

	this.fs.copyTpl(
		this.templatePath('package.json'),
		this.destinationPath('package.json'), {
			appName: this.appname,
			deps: dependencies
		}
	)
};

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);

		this.argument('appname', {type:String, required:true});
		this.appname = _.escape(this.appname);
		this.addons = [];
		this.definedAddons = {
			socketio:{
				'package':[
					{'name':'socket.io', 'v':'^1.3.7'},
					{'name':'socket.io-client', 'v':'^1.3.7'}
				]
			},
			howler:{
				'package':[
					{'name':'howler', 'v':'^1.1.28'}
				]
			}
		};
	},

	prompting: function() {
		var keys = Object.keys(this.definedAddons);

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
	}
});
