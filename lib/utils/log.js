require("colors");

function args (header, arg) {
	var args = Array.prototype.slice.call(arg);
	args.unshift(header + " :");
	console.log.apply(this, args);
	return args;
}

var logLevel = 5;

module.exports = {
	silly: function () {
		(logLevel >= 5) ? args("Silly".grey, arguments) : null;
	},
	debug: function () {
		(logLevel >= 4) ? args("Debug".cyan.italic, arguments) : null;
	},
	log: console.log,
	info: function () {
		(logLevel >= 3) ? args("Info".blue.underline, arguments) : null;
	},
	warn: function () {
		(logLevel >= 2) ? args("Warning".yellow.underline.inverse, arguments) : null;
	},
	warning: this.warn,
	error: function () {
		(logLevel >= 1) ? args("Error".red.bold.inverse, arguments) : null;
	},
	err: this.error,
	setLogLevel: function(nb) {
		logLevel = (nb < 0) ? 0 : (nb > 5) ? 5 : nb;
	}
};