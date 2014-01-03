var val = la.validator,
	sanitize = require("validator").sanitize;

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
		this.err = val(this.schema, this.values);
	},
	enumerable: true,
	configurable: false,
	writable: false
});