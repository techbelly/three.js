editor.loader.registerLoader(['obj'], Loader.Utils.makeTextLoader(function(editor, contents, filename) {
  var object = new THREE.OBJLoader().parse( contents );
  object.name = filename;
  editor.addObject( object );
  editor.select( object );
}));

