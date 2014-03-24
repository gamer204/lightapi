module.exports = {
	csrfToken: function (req, res) {
		res.render("token.ejs");
	},
	csrfForm: function (req, res) {
		log.log(res.body);
		res.send("validated");
	}
}