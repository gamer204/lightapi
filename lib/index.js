require("./exposeGlobals"); // Exposing globals
la.config = require("./config"); // Loading config

require("./components")(function (components) {
	la = _.merge(components, la);  // Loading components
	log.info('Lighapi server is ready');
});