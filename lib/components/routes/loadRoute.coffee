module.exports = (obj, cb) ->
	app = la.app
	Controller = la.controllers.Controller
	
	unless not obj
		try
			log.silly "Trying to load " + obj.ctrl + "." + obj.method + " controller method ..."
			mod = require(__appdir + "/api/controllers/" + obj.ctrl)
			if mod[obj.method] isnt `undefined`
				app[obj.verb] obj.route, (req, res) ->
					ctrl = new Controller(_.assign(
						req: req
						res: res
					, obj))
					mod[obj.method].apply ctrl, arguments_
					return

				# Loads obj.method
				log.silly obj.ctrl + "." + obj.method + " controller method loaded."
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
				throw new Error(e)
	return