function ORM(connection, models) {
	var self = this;
	function prop(name, val) {
		Object.defineProperty(self, name, {
			value: val,
			enumerable: true,
		});
	}

	prop("connection", connection);

	for(var name in models) {
			prop(name, models[name]);

	prop("models", models);	

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

method("transaction", function(cb) {
	this.connection.transaction(cb);
})

module.exports = function(cb) {
	require("./connect")((process.env.TRAVIS) ? { database: "tests", username: "travis", password: "", dialect: "mysql" } : la.config.local.database, function(conn) {
		require("./models")(conn, function(models){
			la.models = models;
			ORMObj = new ORM(conn,models);
			cb(null, ORMObj);
		});
	});
}