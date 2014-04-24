fs = require("fs")
types = require("sequelize")

module.exports = (sequelize, cb) ->
	if sequelize isnt false
		output = {}
		files = undefined
		try
			files = fs.readdirSync(__appdir + la.config.paths.models)
		catch e
			unless e.code is "ENOENT"
				throw e
			else
				log.debug "No #{la.config.paths.models} folder found."
				return cb null, output
		if files.length is 0
			log.silly "No models found."
			return cb null, output
		log.silly "Loading models ..."
		i = 0

		while i < files.length
			file = files[i].slice(0, -3)
			output[file] = require("sandboxed-module").require("#{__appdir}#{la.config.paths.models}/#{file}",
				globals:
					Sequelize: types
			)
			i++
		delete output.associations

		for name of output
			params = _.clone(output[name])
			delete params.attributes

			output[name] = sequelize.define(name, output[name].attributes, params)
			log.silly name + " model loaded."
		try
			log.silly "Setting up associations ..."
			require("sandboxed-module").require __appdir + "#{la.config.paths.models}/associations",
				globals: _.merge(output,
					Sequelize: types
					sequelize: sequelize
				)

		catch e
			unless e.code is "MODULE_NOT_FOUND"
				throw e
			else
				log.warn "No association.js file found. Continuing anyway."
		sequelize.sync().complete (err) ->
			log.silly "Models synced to the database."
			cb err, output
			return
	return