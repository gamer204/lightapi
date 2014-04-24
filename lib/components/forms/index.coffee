exports.component = (cb) ->
	require("./form") (err, Form) ->
		getForm = (schema) ->
			throw new Error("No form name provided.") unless schema
			args = Array.prototype.slice.call arguments
			args[0] = require(__appdir + la.config.paths.forms + "/" + schema)
			createForm.apply this, args
		createForm = () ->
			Temp = ->

			Temp:: = Form::

			inst = new Temp

			ret = Form.apply(inst, arguments)
			
			(if Object(ret) is ret then ret else inst)

		la.components.express.addLocal require "./locals"

		cb null,
			Form: Form
			getForm: getForm
			createForm: createForm

exports.dependencies = ["express"]