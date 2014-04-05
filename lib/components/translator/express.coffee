module.exports = (app) ->
	app.use (req, res, next) ->
		req.session.language = la.config.local.language unless req.session.language
		next()

	app.addLocal translate: (req, res, key, params = {}, lang = req.session.language) ->
		return la.components.translator.translate(key, lang, params)