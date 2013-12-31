var app = require('../express');

function Controller () {

}

module.exports = function buildController(data) {
	return _.assign(Controller.prototype, data);
};