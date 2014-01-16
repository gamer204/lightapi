function ORM(connection, models) {
	var self = this;
	function prop(name, val) {
		Object.defineProperty(self, name, {
			value: val,
			enumerable: true,
		});
	}

	prop("connection", connection);
	prop("models", models);

	for(var name in models) {
		if(name != "models")
			prop(name, models[name]);
	}
}

function method(name, fn) {
	Object.defineProperty(ORM.prototype, name, {
		value: fn,
		enumerable: true,
	});
}

method("getModel", function(name) {
	return this.models[name];
});

method("buildModel", function(name, values) {
	return this.models[name].build(values);
});

module.exports = function(cb) {
	require("./connect")(la.config.local.database, function(conn) {
		require("./models")(conn, function(models){
			la.models = models;
			ORMObj = new ORM(conn,models);
			cb(null, ORMObj);
		});
	});
}