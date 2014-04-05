exports.component = (cb) ->
	Controller = (ctx) ->
		_.assign this, ctx
		return

	method = (name, fn) ->
		Object.defineProperty Controller::, name,
			value: fn
			enumerable: true

		return

	app = la.components.express
	forms = la.components.forms
	ORM = la.components.ORM
	method "getForm", forms.getForm
	method "ORM", ORM
	method "getModel", ORM.getModel
	method "buildModel", ORM.buildModel

	buildController = undefined
	
	cb null,
		Controller: Controller
		buildController: (data) ->
			_.assign Controller::, data


exports.dependencies = [
	"forms"
	"ORM"
	"express"
]