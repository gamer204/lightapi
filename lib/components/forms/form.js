var val = require("validator"),
	check = val.check,
	sanitize = val.sanitize;

module.exports = Form;

function Form (schema) {
	this.values = {};
	Object.defineProperty(this, "schema", {
		value: schema,
		enumerable: true,
		configurable: false,
		writable: false
	});
}

Object.defineProperty(Form.prototype, "bind", {
	value: function bind (req) {
		for(var param in this.schema) {
			if(req[param] !== undefined)
				this.values[param] = (la.config.security.xss) ? sanitize(req[param]).entityEncode() : req[param];
		}
		return this;
	},
	enumerable: true,
	configurable: false,
	writable: false
});

Object.defineProperty(Form.prototype, "valid", {
	get: function () {
		if(this.err === undefined)
			this.validate();
		return (Object.keys(this.err).length === 0) ? true : this.err;
	},
	enumerable: true,
});

Object.defineProperty(Form.prototype, "validate", {
	value: function validate () {
		this.err = {};
		for(prop in this.schema) {
			if(typeof this.schema[prop] === "string") {
				try {
					check(this.values[prop])[this.schema[prop]]();
				} catch (e) {
					if(e.name == "ValidatorError") {
						this.err[prop] = {
							message: e.message,
							assert: this.schema[prop],
							expect: [true]
						}
					} else 
						throw e;
				}
			} else if(typeof this.schema[prop] === "object") {
				for(i in this.schema[prop]) {
					try {
						if(this.schema[prop][i] instanceof Array)
							check(this.values[prop])[i].apply(this, this.schema[prop][i]);
						else
							check(this.values[prop])[i](this.schema[prop][i]);
					} catch (e) {					
						if(e.name == "ValidatorError") {
							this.err[prop] = {
								message: e.msg,
								assert: i,
								expect: this.schema[prop][i]
							};
							if(!(this.schema[prop][i] instanceof Array))
								this.err[prop].expect = [this.schema[prop][i]]
						} else 
							throw e;
					}
				}
			} else {
				throw new Error("Bad syntax of schema.");
			}
		}
	},
	enumerable: true,
	configurable: false,
	writable: false
});