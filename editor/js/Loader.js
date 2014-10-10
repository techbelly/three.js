Loader = function() {

  var formats = {};
  var registerLoader = function(extensions, load_func) {
    Object.keys(extensions).forEach(function(ext) {
      formats[extensions[ext]] = load_func;
    });
  };

  var Loader = function ( editor ) {

    this.registerLoader = function(extensions, load_func) {
      registerLoader(extensions, load_func);
    };

    this.loadFile = function ( file ) {
      var filename = file.name;
      var extension = filename.split( '.' ).pop().toLowerCase();
      var format_loader = formats[extension];
      if (format_loader) {
        format_loader(file, editor);
      } else {
        alert( 'Unsupported file format.' );
      }
    };
  };

  Loader.Utils = {

    addGeometry: function(editor, geometry, type, filename) {
      geometry.sourceType = type;
      geometry.sourceFile = filename;
      var material = new THREE.MeshPhongMaterial();
      var mesh = new THREE.Mesh( geometry, material );
      mesh.name = filename;
      editor.addObject( mesh );
      editor.select( mesh );
    },

    makeTextLoader: function(inner) {
      return function(file, editor) {
        var reader = new FileReader();
        reader.addEventListener( 'load', function (event) {
          var contents = event.target.result;
          inner(editor, contents, file.name);
        }, false);
        reader.readAsText(file);
      };
    },

    makeClassLoader: function(loader, type) {
      var func =  function(editor, contents, filename) {
        var geometry = new loader().parse( contents );
        Loader.Utils.addGeometry(editor, geometry, type, filename);
      };
      return Loader.Utils.makeTextLoader(func);
    }
  };

  return Loader;
}();
