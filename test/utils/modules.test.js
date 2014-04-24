describe("Utils", function(){

	describe("#modules", function(){

		it('should list modules', function (done) {
			la.utils.modules.listModules(function(err, pkgs) {
				if(err) {
					throw err;
				}

				pkgs.should.be.an.Object;
				pkgs.dependencies.should.have.property("lightapi");

				done();

			});
		});

	});

});