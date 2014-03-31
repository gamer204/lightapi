module.exports = {
	"GET /": "IndexController:index",
	"GET /view": "IndexController:view",
	"/csrfToken": "CSRFController:csrfToken",
	"POST /csrfForm": "CSRFController:csrfForm",

	"GET /hello": "IndexController:layout",

	"/local": "IndexController:local",
	"/translate": "IndexController:translate"
};