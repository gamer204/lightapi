builder = require("xmlbuilder")

_attrs = (prefix, params, orphan = true, escape = false) ->
	if(params._tagName)
		prefix = params._tagName
	str = "<#{prefix}"
	_.forIn params, (val, key) ->
		str += " #{key}=\"#{val}\"" # TODO : implement escaping

	if(orphan) then str += " />" else str += ">"

	str

module.exports =
	# Form utilities

	_form_start: form = (obj, attrs = {}) ->
		params = _.merge {action: obj.path, method: "POST"}, attrs

		_attrs "form", params, false

	_form_row: form_row = (row, name, attrs = {}) ->
		# TODO

	_form_end: endform = (form) ->
		ret = ""
		if form.csrf
			ret += _attrs "input", {type: "hidden", name: "_csrf", value: form.csrf}
		ret += "</form>"
		ret