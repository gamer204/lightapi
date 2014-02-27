var validator, schema;

before(function(done) {
	require(laDir)(function(){
		validator = la.validator;
		done();
	});
});

describe("Components", function(){

	describe("#validator", function(){

		var schema, candidate;

		beforeEach(function () {
			candidate = {
				name: "   françois le Français       	",
				age: 21,
				gender: "m",
				compagnies: ["malea", "pantera"],
				birthday: new Date()
			};

			schema = {};
			schema.sanitize = {
				name: {
					type: "string",
					rules: ["trim", "title"],
				},
				age: {
					type: "integer"
				},
				compagnies: {
					type: "array",
					items: {
						type: "string",
						rules: ["trim", "ucfirst"]
					}
				},
				gender: {
					type: "string",
					optional: false,
					def: "m"
				},
				birthday: {
					type: "date"
				}
			};

			schema.validation = {
				name: {
					type: "string",
					minLength: 1
				},
				age: {
					type: "integer",
					gt: 0,
					lte: 120
				},
				gender: {
					type: "string",
					eq: ["m", "f"]
				},
				compagnies: {
					type: "array",
					items: {
						type: "string",
						minLength: 1
					}
				},
				birthday: {
					type: "date"
				}
			};
		});

		it("should validate objects", function () {
			delete schema.sanitize;

			var result = la.validator(schema, candidate);
			result.values.should.be.eql(candidate);

			delete candidate.age;
			result = la.validator(schema, candidate);
			result.error.should.have.property("error").with.be.an.Array.and.have.lengthOf(1);

		});

		it("should sanitize objects", function () {
			delete schema.validation;

			var result = la.validator(schema, candidate);
			result.values.should.not.be.eql(candidate);
			result.values.name.should.be.eql("François Le Français");
			result.error.valid.should.be.true;

			delete candidate.age;
			result = la.validator(schema, candidate);
			result.error.valid.should.be.true;

		});

		it("should do both validate and sanitize", function () {
			var result = la.validator(schema, candidate);
			result.values.should.not.be.eql(candidate);
			result.values.name.should.be.eql("François Le Français");
			result.error.should.have.keys("error", "valid", "format");

			delete candidate.age;
			result = la.validator(schema, candidate);
			result.error.should.have.property("error").with.be.an.Array;

		});

		it("should throw an error if the schema has a bad syntax", function() {
			(function(){
				var result = la.validator({type: "object", properties: {bla: "blah"}}, candidate);
			}).should.throw("Invalid schema syntax.");

		});

	});

});