module.exports = {
	listModules: function listModules (cb) {
		require("child_process").exec("cd ../.. && npm ls --json", function(err, stdout, stderr) {
			if(err) return cb(err);
			cb(null, JSON.parse(stdout).dependencies);
		})
	},
	hasModule: function hasModule (name, cb) {
		this.listModules(function(err, pkgs){
			if(err) cb(err);

			for(pkg in pkgs) {
				if(pkg == name) {
					return cb(null, pkgs[pkg]);
				}
			}

			return cb(null, false);
		});
	}
}