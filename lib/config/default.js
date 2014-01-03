module.exports = {
	server: {
		port: 1337
	},
	local: {
		secret: "",
		database: {
			dialect: "mysql",
			port: 3306
		},
	},
	
	security: {
		xss: true,
		csrf: false // TODO : implement CSRF protection
	}
}