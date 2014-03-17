var http = require("http");

describe("Components", function(){

	describe("#express", function(){

		function get(uri, cb) {
			http.get("http://localhost:"+la.config.server.port+uri, function(res){
				var output = "";

				res.on("data", function(chunk) {
					output += chunk;
				});

				res.on("end", function(){
					cb(output, res);
				});
			});
		}

		it('should start the server', function(done) {
			get("/", function(output) {
				output.should.be.eql("Hello world !");
				done();
			});

		});

		it('should manage sessions', function (done) {
			get("/", function(output, res) {
				res.headers["set-cookie"][0].should.match(/lightapi.sid=/);
				done();
			});

		});

		it('should use locals vars', function (done) {
			get("/view", function(output, res) {
				output.should.be.eql('<script src="nonExistingJsFile.js"></script>');
				done();
			});
		});

		it('should load AngularJS locals');

		it("should manage custom middlewares");

	});

});