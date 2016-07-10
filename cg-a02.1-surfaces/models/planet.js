/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function(showDayTexture, showNightTexture, showCloudTexture) {


            this.root = new THREE.Object3D();

            // load and create required textures
            
            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            var material = new THREE.ShaderMaterial({

                uniforms: THREE.UniformsUtils.merge(

                    [
                        THREE.UniformsLib['lights'],
                        {
                            diffuseMaterial:    { type: 'c', value: new THREE.Color(1,0,0)},
                            specularMaterial:   { type: 'c', value: new THREE.Color(0.7,0.7,0.7)},
                            ambientMaterial:    { type: 'c', value: new THREE.Color(0.8,0.2,0.2)},
                            shininessMaterial:  { type: 'f', value: 8.0},

                            textureDay: 			 { type: 't' },
                            textureCloud: 			 { type: 't' },
                            textureNight: 			 { type: 't' },
                            textureTopography:       { type: 't' },
                            showDayTexture:          { type: 'i', value: showDayTexture},
                            showNightTexture:        { type: 'i', value: showNightTexture},
                            showCloudTexture:        { type: 'i', value: showCloudTexture}
                        }
                    ]
                ),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });


            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //Define the texture for the planet with path
            //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(loader) } );
            var textureLoader = new THREE.TextureLoader();

            textureLoader.load('textures/earth_month04.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureDay.value = t;
            });

            textureLoader.load('textures/earth_at_night_2048.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureNight.value = t;
            });

            textureLoader.load('textures/earth_clouds_2048.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureCloud.value = t;
            });

            textureLoader.load('textures/earth_topography_2048.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureTopography.value = t;
            });

            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);

            this.getMesh = function() {
                return this.root;
            };

            this.getMaterial = function() {
                return this.material;
            }
        }; // constructor

        return Planet;

    })); // define module


