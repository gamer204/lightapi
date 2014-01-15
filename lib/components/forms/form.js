module.exports = Form;

var sanitize = require('google-caja').escapeAttrib;

function Form (schema) {
	Object.defineProperty(this, "schema", {
		value: schema,
		enumerable: true,
		configurable: false,
		writable: false
	});
}

Form.prototype.bind = function bind (req) {
	if(!this.schema)
		throw new Error("No schema provided");
	this.values = {};
	for(var param in this.schema) {
		if(req[param] !== undefined) {
			this.values[param] = (la.config.security.xss) ? sanitize(req[param]) : req[param];
		}
	}
	return this;
};

Object.defineProperty(Form.prototype, "valid", {
	get: function () {
		this.validate();
		return (Object.keys(this.err).length === 0) ? true : false;
	},
	enumerable: true,
});

Form.prototype.validate = function validate () {
	if(!this.schema)
		throw new Error("No schema provided");
	if(!this.values)
		throw new Error("No values provided");
	this.err = la.validator(this.schema, this.values);
	return this;
};