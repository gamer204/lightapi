var validator, schema,
	node_val = require("validator");

before(function(done) {
	require(laDir)(function(){
		validator = la.validator;
		done();
	});
});

describe("Components", function(){

	describe("#validator", function(){

		it("should validate objects");

		it("should sanitize objects");

		it("should do both validate and sanitize");

	});

});