var Form = require("./form");

module.exports = (function () {
	var createForm = function (schema) {
		if(!schema)
			throw new Error("No schema provided.");
		schema = require(__appdir + "/api/forms/" + schema);
		return new Form(schema);
	}

	return {
		createForm: createForm
	}
})();