module.exports = {
	server: {
		port: 1337
	},
	local: {
		secret: ""
	},
	security: {
		xss: true,
		csrf: false // TODO : implement CSRF protection
	}
}