exports.dependencies = ["express", "controllers"]

exports.component = (cb) ->
	loadRoutes = require("./loadRoute")
	parseRoute = require("./parseRoute")

	async.each Object.keys(la.config.routes), ((item, callback) ->
		loadRoutes parseRoute(item, la.config.routes), callback
		), cb