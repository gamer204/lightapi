var app = la.app,
	forms = la.forms,
	ORM = la.ORM;

function Controller (ctx) {
	_.assign(this, ctx);
}

function method(name, fn) {
	Object.defineProperty(Controller.prototype, name, {
		value: fn,
		enumerable: true,
	});
}

method("getForm", forms.getForm); // forms.createForm(form)
method("ORM", ORM);
method("getModel", ORM.getModel); // la.ORM.getModel(name)
method("buildModel", ORM.buildModel); // la.ORM.buildModel(name, values)

module.exports = {
	buildController: function buildController(data) {
		return _.assign(Controller.prototype, data);
	}
};

Object.defineProperty(module.exports, "Controller", {
	get: function(){ return Controller; },
	set: function(val) { if(typeof val === "function") Controller = val; }
});