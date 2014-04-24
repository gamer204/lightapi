module.exports = (cb) -> 
	class Form
		constructor: (schema, req) ->
			self = this
			Object.defineProperty self, "schema",
				value: schema
				enumerable: true,
				configurable: false,
				writable: false

			@values = {}

			unless req is undefined
				@csrf = req.csrfToken() if la.config.security.csrf and req.csrfToken
				@path = req.path if req.path

		bind: (req) ->
			self = this
			throw new Error("No schema provided")  unless @schema

			_.forIn req, (val, key) ->
				if (self.schema.validation.hasOwnProperty key) or (self.schema.sanitize.hasOwnProperty key)
					if (la.config.security.xss) then self.values[key] = _.escape(val)
					else self.values[key] = val

			this

		validate: () ->
			throw new Error("No schema provided") if _.isEmpty @schema
			throw new Error("No values provided") if _.isEmpty @values

			res = la.components.validator(@schema, @values)
			@values = res.value
			@err = res.error

			this

		Object.defineProperty Form::, "valid",
		get: () ->
			this.validate()
			(this.err || {valid: false}).valid
	cb null, Form
