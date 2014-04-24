module.exports = {
	csrfToken: function (req, res) {
		res.render("token.ejs");
	},
	csrfForm: function (req, res) {
		res.send("validated");
	}
}