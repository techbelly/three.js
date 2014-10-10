editor.loader.registerLoader(['ctm'], function(file, editor) {
    var reader = new FileReader();
    reader.addEventListener( 'load', function (event) {
      var data = new Uint8Array( event.target.result );
      var stream = new CTM.Stream( data );
      stream.offset = 0;
      var loader = new THREE.CTMLoader();
      loader.createModel( new CTM.File( stream ), function( geometry ) {
        Loader.Utils.addGeometry(editor, geometry, "ctm", file.name);
      } );
    }, false);
    reader.readAsArrayBuffer(file);
  });


