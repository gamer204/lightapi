seq = undefined
module.exports = (config, cb) ->
	if seq
		cb seq
	else
		if config.username is `undefined` or config.password is `undefined` or config.database is `undefined`
			log.warn "Database authentication information uncomplete, got " + JSON.stringify(config) + ", skipping."
			cb()
		else
			Seq = new require("sequelize")
			seq = new Seq(config.database, config.username, config.password, config)
			seq.authenticate().complete (err) ->
				unless not err
					log.error "Unable to connect to the database : " + err
					throw new Error("Unable to connect to the database : " + err)
				else
					log.debug "Connected to the " + config.dialect + " database."
					cb seq
				return
	return