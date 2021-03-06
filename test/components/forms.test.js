var Form,
	schema = {
	validation: {
		title: {
			type: "string",
			minLength: 10,
			maxLength: 254,
		},
		message:{
			type: "string",
			minLength: 30,
		}
	},
	sanitize: {
		title: {
			type: "string",
			rules: ['trim', 'title']
		},
		message:{
			type: "string",
			rules: ["ucfirst"]
		}
	}
}

before(function() {
	Form = la.components.forms.Form;
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

				form = new Form();
				form.validate();
			}).should.throw("No schema provided");

			(function(){
				var form = new Form(schema);
				form.validate();
			}).should.throw("No values provided");
		});

		it('should copy object and sanitize them (or not) by the `bind` method', function(){
			var form = new Form(schema);
			var req = {
				title: "The title.",
				message: "Unsecure <strong>string</strong>"
			};

			form.bind(req);

			form.values.message.should.not.match(/>|</);

			la.config.security.xss = false;
			form.bind(req);

			form.values.message.should.match(/>|</);
		});

		it('should validate values, or not', function() {
			var form = new Form(schema);
			var req = {
				title: "   the title.",
				message: "A loooooooooooooooooooong message"
			};

			form.bind(req).valid.should.be.true;
		});

		it('should use the form generator', function () {
			var locals = la.components.express.locals;

			var form = new Form(schema);
			form.path = "/fake/path";
			form.csrf = "fakeCsrf";
			var req = {
				title: "The title.",
				message: "Unsecure <strong>string</strong>"
			};

			form.bind(req);

			var ret = locals._form_start(form)
			+ locals._form_end(form);

			ret.should.be.eql('<form action=\"/fake/path\" method=\"POST\"><input type=\"hidden\" name=\"_csrf\" value=\"fakeCsrf\" /></form>');
		});

	});

});