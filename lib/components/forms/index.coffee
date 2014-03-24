exports.component = (cb) ->
	require("./form") (err, Form) ->
		getForm = (schema) ->
			throw new Error("No form name provided.") unless schema
			createForm require(__appdir + "/api/forms/" + schema)
		createForm = (schema) ->
			new Form(schema)
		cb null,
			Form: Form
			getForm: getForm
			createForm: createForm
