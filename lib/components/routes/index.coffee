exports.dependencies = ["express", "controllers"]

exports.component = (cb) ->
	###loadRoutes = require("./loadRoute")
	parseRoute = require("./parseRoute")

	Object.keys(la.config.routes).forEach (item, callback) ->
		loadRoutes(parseRoute(item, la.config.routes), callback)###
	
	cb();