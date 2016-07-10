/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function() {


            this.root = new THREE.Object3D();


            var scope = this;

            // load explosion texture
            //
            // Loading textures is asynchronous. That means you the load function
            // takes the file url as input and three callback functions
            // onLoadSuccess, onLoadProgress and onLoadError
            // we need to handle these cases. Only in onLoadSuccess we can setup
            // the scene, the texture and the shaders correctly.
            
            // define a shader with these uniform values
            var material = new THREE.ShaderMaterial( {

                uniforms: {

                    tExplosion:     {type: "t"},
                    time:           {type: "f", value: 0.0 },
                    weight:         {type: "f", value: parseFloat($("#explosionColor").attr("value"))},
                    freqScale:      {type: "f", value: parseFloat($("#explosionFrequency").attr("value"))},
                    colorScale:     {type: "f", value: parseFloat($("#explosionWeight").attr("value"))}
                },
                vertexShader: Shaders.getVertexShader("explosion"),
                fragmentShader: Shaders.getFragmentShader("explosion")
            } );

            var textureLoader = new THREE.TextureLoader();

            textureLoader.load('textures/explosion.png', function(t) {
                material.uniforms.tExplosion.value = t;
            });
            
            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry( 300, 50, 50 ), material );
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);

            this.material = material;

            
            this.getMesh = function() {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

