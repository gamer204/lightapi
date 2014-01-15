module.exports = function parseRoute (route, routes) {
	var ctrl, method, verb = "get";
	if(typeof routes[route] === "string") {
		if(routes[route].match(/.+:.+/)[0] != routes[route]) {
			log.error("Bad syntax of "+routes[route]+" , stopping server.");
			throw "ParseError";
		}
		ctrl = routes[route].split(":");
		method = ctrl[1];
		ctrl = ctrl[0];
		if(_.contains(["get", "post", "put", "delete"], ((route.match(/GET|POST|PUT|DELETE/i) || [""])[0]).toLowerCase())) {
			verb = route.match(/GET|POST|PUT|DELETE/i)[0];
		}
		route = route.match(/\/[a-zA-Z0-9\/]*$/)[0];
		// Using "GET" if no verb is indicated ONLY IF routes[route] is a string, see line 2;
	} else if(typeof routes[route] === "object") {
		var obj = routes[route];
		if(typeof obj.controller != "string") {
			log.error("Bad syntax of \""+route+"\".controller, stopping server.");
			throw "ParseError";
		} else {
			ctrl = obj.controller;
		}

		if(typeof obj.method != "string") {
			log.error("Bad syntax of \""+route+"\".method, stopping server.");
			throw "ParseError";
		} else {
			method = obj.method;
		}

		if(typeof obj.verb != "string") {
			log.warn("No verb defined for "+ctrl+":"+method+", using "+"GET".italic+".");
			verb = "get";
		} else {
			if(_.contains(["get", "post", "put", "delete"], obj.verb.toLowerCase())) {
				verb = obj.verb;
			} else {
				log.warn("Invalid verb "+obj.verb+" for `"+ctrl+":"+method+"`, using "+"GET".italic+".");
				verb = "get";
			}
		}
	}

	return {
		ctrl: ctrl,
		method: method,
		verb: verb.toLowerCase(),
		route: route
	};
}