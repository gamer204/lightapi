var Form, createForm;

var schema = {
	title: {
		"!isNull": null,
		isLength: [10, 254]
	},
	message: {
		"!isNull": null,
		isLength: 30
	}
}

before(function(done) {
	require(laDir)(function(){
		Form = la.forms.Form;
		createForm = la.forms.createForm;
		done();
	});
});

describe("Components", function(){

	describe("#forms", function(){

		it('should be initialized with no schema, no values and no errors', function(){
			var form = new Form();

			(form.schema || {}).should.be.empty;
			(form.values || {}).should.be.empty;
			(form.err || {}).should.be.empty;
		});

		it('should throw an error if no schema/values is/are provided before binding/validating', function(){
			(function(){
				var form = new Form();
				form.bind({some: "useless data"});
			}).should.throw("No schema provided");

			(function(){
				var form = new Form(schema);
				form.validate();
			}).should.throw("No values provided");

			(function(){
				var form = new Form();
				form.validate();
			}).should.throw("No schema provided");
		});

		it('should copy object and sanitize them (or not) by the `bind` method', function(){
			var form = new Form(schema);
			var req = {
				title: "The title.",
				message: "Unsecure <strong>string</strong>"
			};

			form.bind(req);

			form.values.title.should.be.exactly(req.title);
			form.values.message.should.not.match(/>|</);

			la.config.security.xss = false;
			form.bind(req);

			form.values.message.should.match(/>|</);
		});

		it('should validate values, or not');

	});

});