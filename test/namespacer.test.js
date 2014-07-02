describe('Namespacer', function() {
  var ns;

  beforeEach(function(){
    ns = require("../lib/namespacer")();
  });

  it('should require modules from added namespaces', function() {
    ns.addNamespace('Acme', __dirname+'/sampleApp');
    ns.use('Acme/Nested/Folders/Module').should.be.eql("I'm a module");
    ns.use('Acme').should.have.property('foo');
  });

  it('should allow a global namespace');

  it('should allow multiple folders for an identical namespace');
});