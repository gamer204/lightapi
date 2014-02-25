before(function(done) {
	require(laDir)(function(){
		done();
	});
});

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

	});

});