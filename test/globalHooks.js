global.should = require("should");
global.laDir = __dirname + "/../lib/indexAsync";
global.__appdir = __dirname + "/app";

before(function(done){
	require("../lib").run(done);
})