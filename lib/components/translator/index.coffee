exports.dependencies = ["express", "serializer"] # For locals

fs = require "fs"

exports.component = (cb) ->
	pool = {}

	dirname = "#{__appdir}#{la.config.paths.translations}"

	try
		files = fs.readdirSync dirname
		files.forEach (file) ->
			ext = file.split(".")
			if ["js", "json", "yml", "coffee"].indexOf(ext[2]) != -1
				pool[ext[1]] = {} if not pool[ext[1]]
				_.merge pool[ext[1]][ext[0]] = (($) ->
					parse = la.components.serializer.parse
					switch $
						when "js" or "coffee"
							return require "#{dirname}/#{file}"
						when "json"
							return parse(fs.readFileSync("#{dirname}/#{file}", {encoding: "utf-8"}), "JSON")
						when "yml"
							return parse(fs.readFileSync("#{dirname}/#{file}", {encoding: "utf-8"}), "YAML")
					)(ext[2])
	catch e
		throw e unless e.code == "ENOENT"

	# Express configuration

	require("./express") la.components.express

	cb null,
		pool: pool
		translate: (keys, lang, params = {}) ->
			arr = keys.split(".")

			translated = pool[lang]

			return keys if translated == undefined

			for key in arr
				translated = translated[key]
				return keys if translated == undefined

			_.templateSettings = interpolate: /{{([\s\S]+?)}}/g


			return if typeof translated == "object" then keys else	_.template translated, params
