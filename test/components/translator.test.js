describe("Components", function(){

	describe("#translator", function(){

		var trans, request = require("request"), baseUrl;

		before(function(){
			trans = la.components.translator;
			baseUrl = "http://localhost:"+ la.config.server.port || 80;
		});

		it('should translate strings according to a given key', function(){
			trans.translate("locals.foo", "fr").should.be.eql("bar");
			trans.translate("locals.foo", "en").should.be.eql("baz");
		});

		it('should translate with parameters', function() {
			trans.translate("locals.name", "fr", {name: "Jean-Claude"})
				.should.be.eql("Je m'appelle Jean-Claude");
			trans.translate("locals.name", "en", {name: "Brian"})
				.should.be.eql("My name is Brian");
		});

		it('should manage pluralization');

		it('should translate strings from templates', function(done) {
			async.parallel([
				function(cb) {
					request({
						url: baseUrl + "/translate?name=Brian",
					}, function(error, response, body) {
						body.should.be.eql("My name is Brian");
						cb();
					});					
				},
				function(cb) {
					request({
						url: baseUrl + "/translate?name=Jean&lang=fr",
					}, function(error, response, body) {
						body.should.be.eql("Je m&#39;appelle Jean");
						cb();
					});					
				},
			], done)
		});

	});

});