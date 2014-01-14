var fs = require("fs"),
	types = require("sequelize");

module.exports = function(sequelize, cb) {
	log.silly("Loading models ...");
	var output = {};

	var files = fs.readdirSync(__appdir + "/api/models");

	for(var i = 0; i < files.length; i++) {
		var file = files[i].slice(0, -3);
		output[file] = require("sandboxed-module").require(__appdir + "/api/models/" + file, {
			globals: {Sequelize: types}
		});
	}

	delete output.associations;
	for(var name in output) {
		var params = _.clone(output[name]);
		delete params.attributes;
		output[name] = sequelize.define(name, output[name].attributes, params);
		log.silly(name + " model loaded.");
	}
	try {
		log.silly("Setting up associations ...");
		require("sandboxed-module").require(__appdir + "/api/models/associations", {
			globals: _.merge(output, {Sequelize: types, sequelize: sequelize})
		});
	} catch (e) {
		if(e.code != "MODULE_NOT_FOUND")
			throw e;
		else
			log.warn("No association.js file found. Continuing anyway.");
	}

	sequelize.sync().complete(function(err){
		if(!!err)
			throw err;
		else {
			log.silly("Models synced to the database.");
			cb(output);
		}
	});
}