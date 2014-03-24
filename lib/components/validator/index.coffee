inspect = require("schema-inspector")
exports.component = (cb) ->
	cb null, (schema, val) ->
		ret =
			values: _.cloneDeep(val)
			error:
				valid: true

		if schema.hasOwnProperty("validation") or schema.hasOwnProperty("sanitize")
			if schema.hasOwnProperty("sanitize")
				sanitize =
					type: "object"
					properties: schema.sanitize

				inspect.sanitize sanitize, ret.values
			if schema.hasOwnProperty("validation")
				validation =
					type: "object"
					properties: schema.validation

				ret.error = inspect.validate(validation, ret.values)
		else
			throw new Error("Invalid schema syntax.")
		ret
	return