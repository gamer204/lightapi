var SM = require("sandboxed-module");

function m(name, val) {
	var obj = {};
	obj[name] = val;
	la = _.merge(obj, la);
	return val;
}

module.exports = function (callback) {
	async.auto({
		app: function (cb) {
			cb(null, m("app", require("./express")));
		},
		forms: function (cb) {
			cb(null, m("forms", require("./forms")));
		},
		ORM: function (cb) {
			require("./ORM")(function (err, ORM) {
				cb(err, m("ORM", ORM));
			});
		},
		controllers: ['forms', 'ORM', "app", function (cb, res) {
			cb(null, m("controllers", require("./controllers")));
		}],
		routes: ["app", "controllers", function (cb, res) {
			cb(null, m("routes", require("./routes")));
		}],
		validator: function (cb) {
			cb(null, m("validator", require("./validator")));
		},
	}, function (err, res) {
		if(err)
			throw err;

		for(var item in res) {
			if(res[item] === undefined)
				delete res[item];
		}

		callback(res);
	})
};