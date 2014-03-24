exports.component = (cb) ->
	class ORM
		constructor: (connection, models) ->
			self = this
			prop = (name, val) ->
				Object.defineProperty self, name,
					value: val
					enumerable: true
				return

			prop name, val for name, val of models
			prop "connection", connection
			prop "models", models

		method = (name, fn) ->
			Object.defineProperty ORM::, name,
				value: fn,
				enumerable: true
			return

		method "getModel", (name) -> this.models[name]
		method "buildModel", (name, values) -> this.models[name].build(values)
		method "transaction", (callback) -> this.connection.transaction(callback)


	require("./connect") (if (process.env.TRAVIS) then (
		database: "tests"
		username: "travis"
		password: ""
		dialect: "mysql"
	) else la.config.local.database), (conn) ->
		require("./models") conn, (err, models) ->
			cb err, new ORM(conn, models)
			return
		return