require("colors");

function args (header, arg) {
	var args = Array.prototype.slice.call(arg);
	args.unshift(header + " :");
	return args;
}

module.exports = {
	silly: function () {
		console.log.apply(this, args("Silly".grey, arguments));
	},
	debug: function () {
		console.log.apply(this, args("Debug".cyan.italic, arguments));
	},
	log: console.log,
	info: function () {
		console.log.apply(this, args("Info".blue.underline, arguments));
	},
	warn: function () {
		console.log.apply(this, args("Warning".yellow.underline.inverse, arguments));
	},
	warning: this.warn,
	error: function () {
		console.log.apply(this, args("Error".red.bold.inverse, arguments));
	},
	err: this.error
};