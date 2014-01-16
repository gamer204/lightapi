var models = null;
module.exports = function(seq, cb) {
	if(models !== null)
		require('./loadModels')(seq, function(rtn){
			models = rtn;
			cb(rtn);
		});
	else
		cb(models);
}