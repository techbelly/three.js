editor.loader.registerLoader( ['js','json','3geo','3mat','3obj','3scn'], 
    Loader.Utils.makeTextLoader(function(editor, contents, filename) {

      var loadGeometry = function (data, editor, filename) {
        var loader = new THREE.JSONLoader();
        var result = loader.parse( data );

        var geometry = result.geometry;
        var material;

        if ( result.materials !== undefined ) {
          if ( result.materials.length > 1 ) {
            material = new THREE.MeshFaceMaterial( result.materials );
          } else {
            material = result.materials[ 0 ];
          }
        } else {
          material = new THREE.MeshPhongMaterial();
        }

        geometry.sourceType = "ascii";
        geometry.sourceFile = filename;

        var mesh;

        if ( geometry.animation && geometry.animation.hierarchy ) {
          mesh = new THREE.SkinnedMesh( geometry, material );
        } else {
          mesh = new THREE.Mesh( geometry, material );
        }

        mesh.name = filename;

        editor.addObject( mesh );
        editor.select( mesh );
      };

      var loadObject = function(data, editor) {
        var loader = new THREE.ObjectLoader();
        var result = loader.parse( data );

        if ( result instanceof THREE.Scene ) {
          editor.setScene( result );
        } else {
          editor.addObject( result );
        }
      };

      var loadJSON = function ( data, filename, editor ) {

        if ( data.metadata === undefined ) { // 2.0
          data.metadata = { type: 'Geometry' };
        }

        if ( data.metadata.type === undefined ) { // 3.0
          data.metadata.type = 'Geometry';
        }

        if ( data.metadata.version === undefined ) {
          data.metadata.version = data.metadata.formatVersion;
        }

        if ( data.metadata.type.toLowerCase() === 'geometry' ) {
          loadGeometry(data, editor, filename);
        } else if ( data.metadata.type.toLowerCase() === 'object' ) {
          loadObject(data, editor);
        } else if ( data.metadata.type.toLowerCase() === 'scene' ) {
          var loader = new THREE.SceneLoader();
          loader.parse( data, function ( result ) {
            editor.setScene( result.scene );
          }, '' );
        }
      };

      if ( contents.indexOf( 'postMessage' ) !== -1 ) {
        var blob = new Blob( [ contents ], { type: 'text/javascript' } );
        var url = URL.createObjectURL( blob );
        var worker = new Worker( url );
        worker.onmessage = function ( event ) {
          event.data.metadata = { version: 2 };
          handleJSON( event.data, filename, editor );
        };
        worker.postMessage( Date.now() );
        return;
      } else {
        var data;
        try {
          data = JSON.parse( contents );
        } catch ( error ) {
          alert( error );
          return;
        }
        handleJSON( data, filename, editor );
      }
    }));
