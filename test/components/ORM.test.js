var ORM;

before(function(done) {
	require(laDir)(function(){
		ORM = la.ORM;
		done();
	});
});

describe("Components", function(){

	describe("#ORM", function(){

		it('should load models', function() {
			ORM.models.should.haveproperty("User");
		});

		it('should connect to the database');

		it('should manage transactions');

	});

});