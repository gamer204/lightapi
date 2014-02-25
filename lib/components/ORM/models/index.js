module.exports = function(seq, cb) {
	require('./loadModels')(seq, function(rtn){
		models = rtn;
		cb(rtn);
	});
}