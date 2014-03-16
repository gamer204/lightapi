module.exports = (cb) -> 
	class Form
		self = this
		constructor: (schema) ->
			Object.defineProperty self, "schema",
				value: schema
				enumerable: true,
				configurable: false,
				writable: false

		bind: (req) ->
			throw new Error("No schema provided")  unless @schema
			@values = _.assign({}, req, (key, val) ->
				(if (la.config.security.xss) then _.escape(val) else val)
			)
			this
		validate: () ->
			throw new Error("No schema provided")  unless @schema
			throw new Error("No values provided")  unless @values

			res = la.validator(@schema, @values)
			@values = res.value
			@err = res.error
			this
		Object.defineProperty Form::, "valid",
		get: () ->
			this.validate()
			(this.err || {valid: false}).valid
	cb null, Form
