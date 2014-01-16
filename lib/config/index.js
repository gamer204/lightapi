var config = {};

try {
	require("fs").readdirSync(__appdir+"/config").forEach(function(file) {
		config[file.slice(0, -3)] = require(__appdir+"/config/" + file);
	});
} catch(e) {
	if(e.code == "ENOENT")
		log.error("No "+"/config".italic+" folder found. Stopping the server.");
	throw e;
}

var config = _.merge(require("./default"), config);

module.exports = config;