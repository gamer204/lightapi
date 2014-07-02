var _ = require('lodash');

module.exports = function() {
  var namespaces = {};

  /**
   * Requires a module
   * @param  {String} module The name of the module
   * @return {mixed}         The requested module
   */
  var use = function(module) {
    var subnamespaces = module.split('/');
    var i = subnamespaces.length;


    while(i > 0) {
      var curNamespace = subnamespaces.slice(0, i).join('/');

      if(_.isString(namespaces[curNamespace])) {
        return require(
          namespaces[curNamespace]
          + ((i != subnamespaces.length) ? '/' : '')
          + subnamespaces.slice(i).join('/')
        );
      }
      i--;
    }

    return;
  };

  /**
   * Register a new namespace
   * @param {String} name The name of the namespace
   * @param {String} dir  The root directory of the namespace
   */
  var addNamespace = function(name, dir) {
    namespaces[name] = dir;
  };

  return {
    use: use,
    addNamespace: addNamespace
  };
};
