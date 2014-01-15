var Form = require("./form");

module.exports = (function () {
	var getForm = function (schema) {
		if(!schema)
			throw new Error("No form name provided.");
		schema = require(__appdir + "/api/forms/" + schema);
		return createForm(schema);
	};

	var createForm = function (schema) {
		return new Form(schema);
	};

	return {
		createForm: createForm,
		getForm: getForm,
		Form: Form
	}
})();