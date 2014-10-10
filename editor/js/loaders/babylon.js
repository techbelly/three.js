editor.loader.registerLoader(['babylon'], Loader.Utils.makeTextLoader(function(editor, contents) {
  var json = JSON.parse( contents );
  var loader = new THREE.BabylonLoader();
  var scene = loader.parse( json );
  editor.setScene( scene );
}));

