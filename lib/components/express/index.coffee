exports.component = (cb) ->
	express = require("express")
	app = express()
	app.configure ->
		unless la.config.local.secret
			log.warn "No secret defined for the session, using a random generated session."
			la.config.local.secret = require("random-token")(32)
		app.set "views", __appdir + "/api/views"
		app.use express.static(__appdir + "/assets")
		app.use express.bodyParser()
		app.use express.cookieParser(la.config.local.secret)
		app.use express.session(
			secret: la.config.local.secret or Math.random().toString(36)
			key: "lightapi.sid"
		)
		app.use express.csrf()
		return

	require("./loadLocals") app
	app.listen la.config.server.port
	log.info "Express started and listening to port " + la.config.server.port + " ..."
	cb null, app