module.exports = {
	listModules: function listModules (cb) {
		require("child_process").exec("cd ../.. && npm ls --json", function(err, stdout, stderr) {
			if(err) return cb(err);
			cb(null, JSON.parse(stdout));
		})
	},
	hasModule: function hasModule (name, cb) {
		listModules(function(err, pkgs){
			if(err) throw err;

			for(pkg in pgks.dependencies) {
				if(pkg == name) {
					return true;
				}
			}

			return false;
		});
	}
}