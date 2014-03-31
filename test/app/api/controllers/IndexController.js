module.exports = {
	index : function (req, res) {
		res.send("Hello world !");
	},
	view: function (req, res) {
		res.render("index.ejs");
	},
	layout: function(req, res) {
		res.render("layout.ejs", req.query);
	},
	local: function(req, res) {
		res.greeter = "Hello from the controller !";
		res.render("local.ejs");
	},
	translate: function(req, res) {
		if(!req.query.lang)
			req.query.lang = "en";
		
		res.render("translate.ejs", req.query);
	}
}