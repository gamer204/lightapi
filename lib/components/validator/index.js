var validator = require("validator");

module.exports = function(schema, val) {
	var err = {};
	for(prop in schema) {
		if(typeof schema[prop] === "string") {
			var result = schema[prop].match(/^[ ]*![a-zA-Z]*.+$/) ? !validator[schema[prop].match(/[a-zA-Z]+$/)[0]](val[prop]) : validator[schema[prop]](val[prop]); // Determine if is "validation" or "!validation" and call the appropriate method
			if(!result) {
				err[prop] = {
					assert: schema[prop],
					parameters: []
				}
			}
		} else if(typeof schema[prop] === "object") {
			for(i in schema[prop]) {
				var params = [val[prop]];
				if(schema[prop][i] instanceof Array) {
					params.push.apply(params, schema[prop][i]);
				} else {
					params.push(schema[prop][i]);
				}

				var result = i.match(/^[ ]*![a-zA-Z]*.+$/) ? !validator[i.match(/[a-zA-Z]+$/)[0]].apply(this, params) : validator[i].apply(this, params);
				if(!result) {
					err[prop] = {
						assert: i,
						parameters: params.slice(1)
					}
				}
			}
		} else {
			throw new Error("Bad syntax of schema.");
		}
	}
	return err;
};