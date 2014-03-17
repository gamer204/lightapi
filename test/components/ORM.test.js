var ORM;

before(function() {
	ORM = la.components.ORM;
});

describe("Components", function(){

	describe("#ORM", function(){

		it('should connect to the database', function(){
			ORM.connection.options.should.be.an.Object;
			ORM.connection.options.dialect.should.be.eql("mysql");
			ORM.connection.options.port.should.be.eql("3306");
		});

		it('should load models', function() {
			ORM.models.should.have.property("User");
			ORM.should.have.property("User");
		});

		it('should manage transactions', function(done){
			ORM.transaction(function(t){
				t.should.be.an.Object;
				done();
			})
		});

	});

});