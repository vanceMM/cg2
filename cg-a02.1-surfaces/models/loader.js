/**
 * Created by valentin on 17/06/16.
 */

define(["three" ],
    (function (THREE ) {

        "use strict";
        var Loader = function (controller) {

            this.manager = new THREE.LoadingManager();
            this.manager.onProgress = function ( item, loaded, total ) {
                console.log( item, loaded, total );
            };
            this.FileLoader = new THREE.OBJLoader(this.manager);
            this.mesh = undefined;


            // load a resource loader.load(
            // resource URL 'models/skinned/UCS_config.json',
            // Function when resource is loaded function ( object ) { scene.add( object ); } );
            this.mesh = undefined;
            var loader = this;
            this.getMesh = function () {
                var mesh = undefined;
                this.FileLoader.load('obj/dromedar.obj', function (object) {
                    console.log(controller);
                    //controller.onFileLoaded(object);
                    controller.addMesh(object);

                });
                
                //return object here
            };



        };

        return Loader;

    }));
