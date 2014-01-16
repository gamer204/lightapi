GLOBAL["la"] = {};
if(typeof __appdir === undefined)
	GLOBAL["__appdir"] = __dirname + "/../../..";
if(typeof __moddir === undefined)
	GLOBAL["__moddir"] = __dirname + "/..";
GLOBAL["log"] = require("./utils/log");
GLOBAL["_"] = require("lodash");
GLOBAL["async"] = require("async");