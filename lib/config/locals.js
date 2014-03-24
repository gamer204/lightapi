module.exports = {
	scriptTag : function scriptTag (name) {
		return "<script src=\""+name+"\"></script>";
	},
	cssTag : function cssTag (name, rel) {
		var rel = rel || "stylesheet";
		return "<link rel="+rel+" href=\""+name+"\">";
	}
}