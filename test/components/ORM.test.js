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

		it('should load models', function(done) {
			ORM.models.should.have.property("User");
			ORM.should.have.property("User");

			ORM.User.findOrCreate({
				email: "gamlrfl@ggreg.gt",
				password: "g2rg5gfd4",
			}, { job: 'Technical Lead JavaScript' })
				.success(function(user, created) {
					user.values.should.have.properties("email", "password",
						"active", "id", "createdAt", "updatedAt");
					done();
				})
		});

		it('should manage transactions', function(done){
			ORM.transaction(function(t){
				t.should.be.an.Object;
				done();
			})
		});

	});

});