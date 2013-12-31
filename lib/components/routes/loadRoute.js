var app = require("../express")
	, buildController = require("../controllers");

module.exports = function(obj, cb) {
	if(!!obj) {
		try {
			log.silly("Trying to load "+obj.ctrl+"."+obj.method+" controller method ...");
			var mod = buildController(require(__appdir + "/api/controllers/"+obj.ctrl));
			if(mod[obj.method] !== undefined) {
				app[obj.verb](obj.route, mod[obj.method]); // Loads obj.method
				log.silly(obj.ctrl+"."+obj.method+" controller method loaded.");
				cb();
			}			
			else {
				log.error(obj.method+" method of "+ obj.ctrl +" controller not found. Stopping server.");
				throw new Error("Method not found");
			}
		} catch(e) {
			if(e.code === 'MODULE_NOT_FOUND') {
				log.error(obj.ctrl+" controller not found. Stopping server.");
				throw new Error("Controller not found");
			}
			else {
				log.warn(e);
				cb("Error :c");
			}
		}
	}	
}