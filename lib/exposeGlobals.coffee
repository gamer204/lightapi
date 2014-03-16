GLOBAL["la"] = {}
GLOBAL["__appdir"] = __dirname + "/../../.."  if typeof __appdir is "undefined"
GLOBAL["__moddir"] = __dirname + "/.."  if typeof __moddir is "undefined"
GLOBAL["log"] = require("./utils/log")
GLOBAL["_"] = require("lodash")
GLOBAL["async"] = require("async")