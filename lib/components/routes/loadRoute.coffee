module.exports = (obj, cb) ->
	app = la.components.express
	Controller = la.components.controllers.Controller
	
	unless not obj
		try
			controller = require "#{__appdir}#{la.config.paths.controllers}/#{obj.ctrl}"
			if controller[obj.method] isnt `undefined`
				app[obj.verb] obj.route, (req, res) ->
					ctrl = new Controller(_.assign(
						req: req
						res: res
					, obj))
					controller[obj.method].apply ctrl, arguments
					return
				# Loads obj.method
				cb null, null
			else
				log.error obj.method + " method of " + obj.ctrl + " controller not found. Stopping server."
				throw new Error("Method not found")
		catch e
			if e.code is "MODULE_NOT_FOUND"
				log.error obj.ctrl + " controller not found. Stopping server."
				throw new Error("Controller not found")
			else
				log.error e
				throw e
	return