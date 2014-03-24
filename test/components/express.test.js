var request = require("request");

describe("Components", function(){

	describe("#express", function(){

		var baseUrl, jar;

		before(function(){
			baseUrl = "http://localhost:"+ la.config.server.port || 80;
			jar = request.jar();
		});

		it('should start the server', function(done) {

			request({
				url: baseUrl
			}, function(error, response, body) {
				body.should.be.eql("Hello world !");
				done();
			});

		});

		it('should manage sessions', function (done) {
			request({
				url: baseUrl,
				jar: jar
			}, function(error, response, body) {
				jar.getCookieString("http://localhost/")
					.should.match(/lightapi.sid=/);
				done();
			});
		});

		it('should use locals vars', function (done) {
			request({
				url: baseUrl + "/view"
			}, function(error, response, body) {
				body.should.be.eql('<script src="nonExistingJsFile.js"></script>');
				done();
			});
		});

		it('should implement CSRF protection', function (done) {
	request({
		url: baseUrl + "/csrfToken",
		jar: jar
	}, function(error, response, token) {
		jar.getCookieString("http://localhost/")
			.should.match(/csrfToken=/);
		request.post({
			url: baseUrl + "/csrfForm",
			jar: jar,
			headers: {
				"x-xsrf-token": token
			}
		}, function(error, response, body) {
			body.should.be.eql("validated");
			done();
		});
	});
		});

		it('should load AngularJS locals');

		it("should manage custom middlewares");

	});

});