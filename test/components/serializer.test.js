describe("Components", function(){

	describe("#serializer", function(){

		var ser;

		before(function () {
			ser = la.components.serializer;
		})

		it('should (un)serialize YAML', function () {
			var ser = la.components.serializer;

			var obj = {a: "b"};

			ser.parse(ser.serialize(obj, "YAML").should.be.eql('a: b\n').obj,
				"YAML").should.be.eql(obj);
		});

		it('should (un)seralize JSON', function () {
			var ser = la.components.serializer;

			var obj = {a: "b"};

			ser.parse(ser.serialize(obj, "JSON").should.be.eql('{"a":"b"}').obj,
				"JSON").should.be.eql(obj);
		});

		it('should (un)serialize XML');

	});

});