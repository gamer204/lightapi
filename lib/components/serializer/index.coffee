yaml = require "js-yaml"

exports.component = (cb) ->
	cb null,
		parse: parse = (input, format) ->
			switch format.toUpperCase()
				when "JSON"
					return JSON.parse input
				when "YAML"
					return yaml.safeLoad input
				else
					throw new Error "Invalid parse format"
		serialize: serialize = (input, format) ->
			switch format.toUpperCase()
				when "JSON"
					return JSON.stringify input
				when "YAML"
					return yaml.safeDump input				
				else
					throw new Error "Invalid parse format"
