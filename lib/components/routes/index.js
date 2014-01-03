var loadRoutes = require("./loadRoute")
	, parseRoute = require("./parseRoute");

async.each(Object.keys(la.config.routes), function (item, cb) {
	loadRoutes(parseRoute(item, la.config.routes), cb);
});

module.exports = undefined;