exports.component = (cb) ->
	express = require("express")
	app = express()
	app.configure ->
		unless la.config.local.secret
			log.warn "No secret defined for the session, using a random secret."
			la.config.local.secret = require("random-token")(32)
		app.set "views", __appdir + "/api/views"
		app.use express.static(__appdir + "/assets")
		app.use express.bodyParser()
		app.use express.cookieParser(la.config.local.secret)
		app.use express.session(
			secret: la.config.local.secret or Math.random().toString(36)
			key: "lightapi.sid"
		)
		if la.config.security.csrf
			log.silly "CSRF security enabled"
			app.use express.csrf()
			app.use (req, res, next) ->
				res.locals.csrfToken = req.csrfToken()
				res.cookie "csrfToken", req.csrfToken()
				next()
				return
		else
			log.warn "CSRF protection is disabled !"
			app.use (req, res, next) ->
				res.locals.csrfToken = undefined
				next()

		return

	require("./loadLocals") app
	app.listen la.config.server.port
	log.info "Express started and listening to port " + la.config.server.port + " ..."
	cb null, app