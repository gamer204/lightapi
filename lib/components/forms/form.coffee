module.exports = (cb) -> 
	class Form
		constructor: (schema) ->
			self = this
			Object.defineProperty self, "schema",
				value: schema
				enumerable: true,
				configurable: false,
				writable: false

		bind: (req) ->
			self = this
			throw new Error("No schema provided")  unless @schema

			@values = _.mapValues req, (val, key) ->
				if (la.config.security.xss) then val = _.escape(val) else val

			@csrf = req.csrfToken() if la.config.security.csrf and req.csrfToken
			@path = req.path if req.path

			this

		validate: () ->
			throw new Error("No schema provided")  unless @schema
			throw new Error("No values provided")  unless @values

			res = la.components.validator(@schema, @values)
			@values = res.value
			@err = res.error
			this

		Object.defineProperty Form::, "valid",
		get: () ->
			this.validate()
			(this.err || {valid: false}).valid
	cb null, Form
