module.exports = parseRoute = (route, routes) ->
	ctrl = undefined
	method = undefined
	verb = "get"
	if typeof routes[route] is "string"
		unless routes[route].match(/.+:.+/)[0] is routes[route]
			log.error "Bad syntax of " + routes[route] + " , stopping server."
			throw "ParseError"
		ctrl = routes[route].split(":")
		method = ctrl[1]
		ctrl = ctrl[0]
		verb = route.match(/GET|POST|PUT|DELETE/i)[0]  if _.contains([
			"get"
			"post"
			"put"
			"delete"
		], ((route.match(/GET|POST|PUT|DELETE/i) or [""])[0]).toLowerCase())
		route = route.match(/\/.*:*.*/)[0]
	
	# Using "GET" if no verb is indicated ONLY IF routes[route] is a string, see line 2;
	else if typeof routes[route] is "object"
		obj = routes[route]
		unless typeof obj.controller is "string"
			log.error "Bad syntax of \"" + route + "\".controller, stopping server."
			throw "ParseError"
		else
			ctrl = obj.controller
		unless typeof obj.method is "string"
			log.error "Bad syntax of \"" + route + "\".method, stopping server."
			throw "ParseError"
		else
			method = obj.method
		unless typeof obj.verb is "string"
			log.warn "No verb defined for " + ctrl + ":" + method + ", using " + "GET".italic + "." # TODO : to verbose
			verb = "get"
		else
			if _.contains([
				"get"
				"post"
				"put"
				"delete"
			], obj.verb.toLowerCase())
				verb = obj.verb
			else
				log.warn "Invalid verb " + obj.verb + " for `" + ctrl + ":" + method + "`, using " + "GET".italic + "."
				verb = "get"
	log.silly verb.toUpperCase() + " " + route + " -> " + ctrl + "." + method
	ctrl: ctrl
	method: method
	verb: verb.toLowerCase()
	route: route