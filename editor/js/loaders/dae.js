editor.loader.registerLoader(['dae'], Loader.Utils.makeTextLoader(function(editor, contents, filename) {
  var parser = new DOMParser();
  var xml = parser.parseFromString( contents, 'text/xml' );

  var loader = new THREE.ColladaLoader();
  loader.parse( xml, function ( collada ) {

    collada.scene.name = filename;

    editor.addObject( collada.scene );
    editor.select( collada.scene );

  } );
}));

