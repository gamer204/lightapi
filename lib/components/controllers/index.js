var app = require('../express'), forms = require("../forms");

function Controller () {
	this.req = this.res = {};
}

Object.defineProperty(Controller.prototype, "getForm", {
	value: function (form) {
		return forms.createForm(form);
	},
	enumerable: true
});

module.exports = function buildController(data) {
	return _.assign(Controller.prototype, data);
};