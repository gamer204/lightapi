require("./exposeGlobals"); // Exposing globals
la.config = require("./config"); // Loading config

la.utils = require("require-all")(__dirname + "/utils");

require("./components")(function (components) {
	la = _.merge(components, la);  // Loading components
	log.info('Lighapi server is ready');
});