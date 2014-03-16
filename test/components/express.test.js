var http = require("http");

describe("Components", function(){

	describe("#express", function(){

		it('should start the server', function(done){
			http.get("http://localhost:"+la.config.server.port+"/", function(res){
				var output = "";

				res.on("data", function(chunk) {
					output += chunk;
				});

				res.on("end", function(){
					output.should.be.eql("Hello world !");
					done();
				});

			});

		});

		it('should manage sessions', function (done) {
			http.get("http://localhost:"+la.config.server.port+"/", function(res){
				var output = "";

				res.on("data", function(chunk) {
					output += chunk;
				});

				res.on("end", function(){
					res.headers["set-cookie"][0].should.match(/lightapi.sid=/);
					done();
				});

			});

		});

		it('should use locals vars', function (done) {
			http.get("http://localhost:"+la.config.server.port+"/view", function(res){
				var output = "";

				res.on("data", function(chunk) {
					output += chunk;
				});

				res.on("end", function(){
					output.should.be.eql('<script src="nonExistingJsFile.js"></script>');
					done();
				});

			});
		});

		it('should load AngularJS locals');

		it("should manage custom middlewares");

	});

});