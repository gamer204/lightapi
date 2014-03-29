exports.dependencies = ["express", "serializer"] # For locals

fs = require "fs"

exports.component = (cb) ->
	pool = {}

	dirname = "#{__appdir}/api/translations"

	try
		files = fs.readdirSync dirname
		files.forEach (file) ->
			ext = file.split(".")
			if ["js", "json", "yml", "coffee"].indexOf(ext[2]) != -1
				pool[ext[1]] = {}
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
	

	cb null,
		pool: pool
		translate: (keys, lang) ->
			keys = keys.split(".")

			translated = pool[lang]

			return "" if translated == undefined

			for key in keys
				translated = translated[key]
				return "" if translated == undefined

			return if typeof translated == "object" then "" else translated
