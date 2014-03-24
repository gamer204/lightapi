var http = require("http");

describe("Utils", function(){

	describe("#function", function(){

		it('should return function parameters name', function(){
			la.utils.function.getParamNames(function(testparam, foo, bar, baz) {})
				.should.be.an.Array.eql(["testparam", "foo", "bar", "baz"]);
		});

	});

});