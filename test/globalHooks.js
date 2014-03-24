global.should = require("should");
global.__appdir = __dirname + "/app";

before(function(done){
	require("../lib").run(done);
})