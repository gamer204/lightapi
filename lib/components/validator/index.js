var val = require("validator"),
	check = val.check,
	sanitize = val.sanitize;

module.exports = function(schema, val) {
	var err = {};
	for(prop in schema) {
		if(typeof schema[prop] === "string") {
			try {
				check(val[prop])[schema[prop]]();
			} catch (e) {
				if(e.name == "ValidatorError") {
					err[prop] = {
						message: e.message,
						assert: schema[prop],
						expect: [true]
					}
				} else 
					throw e;
			}
		} else if(typeof schema[prop] === "object") {
			for(i in schema[prop]) {
				try {
					if(schema[prop][i] instanceof Array)
						check(val[prop])[i].apply(this, schema[prop][i]);
					else
						check(val[prop])[i](schema[prop][i]);
				} catch (e) {					
					if(e.name == "ValidatorError") {
						err[prop] = {
							message: e.msg,
							assert: i,
							expect: schema[prop][i]
						};
						if(!(schema[prop][i] instanceof Array))
							err[prop].expect = [schema[prop][i]]
					} else 
						throw e;
				}
			}
		} else {
			throw new Error("Bad syntax of schema.");
		}
	}
	return err;
};