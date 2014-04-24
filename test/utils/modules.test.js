describe("Utils", function(){

	describe("#modules", function(){

		it('should list modules', function (done) {

			la.utils.modules.listModules(function(err, pkgs) {
				if(err) {
					throw err;
				}

				pkgs.should.be.an.Object;
				pkgs.should.have.property("lightapi");

				done();

			});

		});

		it("should tell if a module is installed", function (done) {

			la.utils.modules.hasModule("lightapi", function(err, res) {

				if(err) throw err;

				res.should.be.an.Object;
				res.should.have.property("version");

				done();

			});

		});

	});

});