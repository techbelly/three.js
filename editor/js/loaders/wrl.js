editor.loader.registerLoader(['wrl'], Loader.Utils.makeTextLoader(function(editor, contents) {
  var result = new THREE.VRMLLoader().parse( contents );
  editor.setScene( result );
}));
