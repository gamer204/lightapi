var config = {};

require("fs").readdirSync(__appdir+"/config").forEach(function(file) {
	config[file.slice(0, -3)] = require(__appdir+"/config/" + file);
});

_.merge(require("./default"), config);

module.exports = config;