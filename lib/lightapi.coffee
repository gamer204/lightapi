EventEmitter =  require("events").EventEmitter

require "./exposeGlobals"
reqAll = require 'require-all'
fs = require "fs"

class LightApi extends EventEmitter
	constructor: () ->
		@config = require "./config"
		@utils = reqAll __dirname + "/utils"
		@components = {}

	register: (name, mod) ->
		@components[name] = mod unless mod == null or mod == undefined
		return

	run: (cb = () ->) ->
		self = this
		modules = {}
		dirname = __dirname + "/components"
		files = fs.readdirSync dirname

		files.forEach (file) ->
			filepath = dirname + "/" + file
			if fs.statSync(filepath).isDirectory()
				modules[file] = require filepath unless modules.hasOwnProperty(file)
			return

		automap = _.transform modules, (res, val, key) ->
			wrap = ($) ->
				(cb) ->
					$.component (err, mod) ->
						self.register key, mod
						cb err, mod
						return
					return

			if _.isEmpty val.dependencies
				res[key] = wrap val
			else
				res[key] = (($) ->
					result = $.dependencies.slice 0
					result.push wrap $
					result
				)(val)
			
		async.auto automap, (err, results) ->
			throw err if err
			log.info "Light API loaded"
			cb(err);
			return

	close: (cb = () -> ) ->
		self = this
		arr = @listeners "close"
		async.each arr, ((item, cb) -> item cb
		), (err) ->
			throw err if err
			self.components = {}
			log.warn "LightAPI is closed."
			cb err


global.la = new LightApi()
module.exports = global.la
