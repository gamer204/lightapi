describe("Components", function(){

	describe("#translator", function(){

		var trans;

		before(function(){
			trans = la.components.translator;
		});

		it('should translate strings according to a given key', function(){
			trans.translate("locals.foo", "fr").should.be.eql("bar");
			trans.translate("locals.foo", "en").should.be.eql("baz");
		});

		it('should translate with parameters');

		it('should translate strings from templates');

	});

});