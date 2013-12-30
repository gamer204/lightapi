require("./exposeGlobals"); // Exposing globals

la.config = require("./config"); // Loading config

la = _.merge(require("./components"), la); // Loading components

log.info('Lighapi server is ready');