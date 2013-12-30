var express = require('express');
var app = express();

app.configure(function () {
	app.set('views', __appdir + "/api/views");
});

app.use(express.static(__appdir + "/assets"));

app.listen(la.config.server.port);
log.info('Express started and listening to port '+la.config.server.port+' ...');

module.exports = app;