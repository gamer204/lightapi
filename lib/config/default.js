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
		language: "en"
	},
	
	security: {
		xss: true,
		csrf: true
	},

	paths: {
		views: "/api/views",
		assets: "/assets",
		controllers: "/api/controllers",
		forms: "/api/forms",
		models: "/api/models",
		translations: "/api/translations"
	},

	locals: require("./locals")
}