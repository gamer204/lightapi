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

		beforeEach(function(){
			schema = {
				title: "!isNull",
				message: {
					"!isNull": null,
					isLength: 10
				},
				category: {
					isIn: [["cat1", "cat2", "cat3", "cat4"]]
				}
			};
		})

		it('should return a valid object containing validation errors (or not)', function() {
			var values = {
				title: "Title",
				message: "Correct message",
				category: "cat4"
			}

			validator(schema, values).should.be.an.Object.and.be.eql({});

			values.category = "invalidCategory";
			validator(schema, values).should.be.an.Object.and.have.a.property("category")
				.with.properties("assert", "parameters")
				.with.property("assert").eql("isIn");
		});

		it('should validate using `validator` methods', function() {
			var values = {
				title: "title",
				message: "Too short",
				category: "cat2"
			}

			var err = validator(schema, values);

			node_val.isLength(values.message, 10).should.be.eql(!err.message);
		});

	});

});