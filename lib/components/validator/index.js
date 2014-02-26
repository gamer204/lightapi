var inspect = require("schema-inspector");

module.exports = function(schema, val) {
	var ret = {value: _.cloneDeep(val), error: {}};
	
	if(schema.hasOwnProperty("validation") || schema.hasOwnProperty("sanitize")) {
		if(schema.hasOwnProperty("sanitize")) {
			var sanitize = {
				type: "object",
				properties: schema.sanitize
			};
			inspect.sanitize(sanitize, ret.value);
		}
		if(schema.hasOwnProperty("validation")) {
			var validation = {
				type: "object",
				properties: schema.validation
			};
			ret.error = inspect.validate(validation, ret.value);
		}
	} else {
		throw new Error("Invalid schema syntax.");
	}
	return ret;
};