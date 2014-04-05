builder = require("xmlbuilder")

_attrs = (elem, attrs) ->
	for prop, value of attrs
		elem.att prop, value

module.exports =
	# Form utilities

	form: form = (obj, attrs = {}) ->
		root = builder.create "form"

		_attrs root, _.merge {action: obj.path}, attrs

		root.toString()

	form_row: form_row = (row, name, attrs = {}) ->
		if typeof name == "object"
			attrs = name
			name = row
		else if name == undefined
			name = row

		root = builder.create "input"

		_attrs root, _.merge {type: "text", name:name}, attrs

		root.toString()

	endform: endform = (form) ->
		ret = ""
		if form.csrf
			ret += "<input type=\"hidden\" name=\"_csrf\" value=\"#{form.csrf}\"/>"
		ret += "</form>"