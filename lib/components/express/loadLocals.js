module.exports = function (app) {
	_.merge(app.locals, (la.config.locals) || {});
}