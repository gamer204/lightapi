module.exports = {
	index : function (req, res) {
		res.send("Hello world !");
	},
	view: function (req, res) {
		res.render("index.ejs");
	},
	layout: function(req, res) {
		res.render("layout.ejs", {who: req.query.who});
	},
	local: function(req, res) {
		res.greeter = "Hello from the controller !";
		res.render("local.ejs");
	}
}