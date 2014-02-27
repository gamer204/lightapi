module.exports = Form;

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

	this.values = _.assign({},req, function(key, val) {
		return (la.config.security.xss) ? _.escape(val) : val;
	});

	return this;
};

Object.defineProperty(Form.prototype, "valid", {
	get: function () {
		this.validate();
		return this.err.valid || true;
	},
	enumerable: true,
});

Form.prototype.validate = function validate () {
	if(!this.schema)
		throw new Error("No schema provided");
	if(!this.values)
		throw new Error("No values provided");
	var res = la.validator(this.schema, this.values);
	this.values = res.value;
	this.err = res.err;
	return this;
};