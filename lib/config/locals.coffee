module.exports =
	scriptTag: scriptTag = (name) ->
		"<script src=\"#{name}\"></script>"

	cssTag: cssTag = (name, rel) ->
		rel = rel or "stylesheet"
		"<link rel=\"#{rel}\"href=\"#{name}\">"