editor.loader.registerLoader(['stl'], function(file, editor) {
    var reader = new FileReader();
    reader.addEventListener( 'load', function ( event ) {
      var contents = event.target.result;
      var geometry = new THREE.STLLoader().parse( contents );
      Loader.Utils.addGeometry(editor, geometry, 'stl', file.name);
    }, false );


    if ( reader.readAsBinaryString !== undefined ) {
      reader.readAsBinaryString( file );
    } else {
      reader.readAsArrayBuffer( file );
    }
});

