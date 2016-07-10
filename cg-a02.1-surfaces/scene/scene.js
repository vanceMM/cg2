/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */

define(["three", "util", "shaders", "BufferGeometry", "random", "band", "robot"],
    function (THREE, util, shaders, BufferGeometry, Random, Band, robot) {


        "use strict";
        var start = Date.now();
        /*
         * Scene constructor
         */
        var Scene = function (renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera(66, width / height, 0.1, 2000);
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);

            // animations on seperate keys
            function onDocumentKeyDown(event) {
                // Get the key code of the pressed key
                var keyCode = event.which;

                if (keyCode == 38) {
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if (keyCode == 40) {
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if (keyCode == 37) {
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if (keyCode == 39) {
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                } else if (keyCode == 65) {
                    console.log("A");
                    var nodeHead = scope.scene.getObjectByName("fingerJointLeft", true);
                    if (nodeHead)
                        nodeHead.rotation.x += -0.05;
                } else if (keyCode == 90) {
                    console.log("Z");
                    var nodeHead = scope.scene.getObjectByName("fingerJointLeft", true);
                    if (nodeHead)
                        nodeHead.rotation.x += 0.05;
                } else if (keyCode == 68) {
                    console.log("D");
                    var nodeHead = scope.scene.getObjectByName("fingerJointRight", true);
                    if (nodeHead)
                        nodeHead.rotation.x += -0.05;
                } else if (keyCode == 67) {
                    console.log("C");
                    var nodeHead = scope.scene.getObjectByName("fingerJointRight", true);
                    if (nodeHead)
                        nodeHead.rotation.x += 0.05;
                } else if (keyCode == 87) {
                    console.log("W");
                    var nodeHead = scope.scene.getObjectByName("tooth1", true);
                    if (nodeHead)
                        nodeHead.rotation.x += -0.05;
                } else if (keyCode == 83) {
                    console.log("S");
                    var nodeHead = scope.scene.getObjectByName("tooth1", true);
                    if (nodeHead)
                        nodeHead.rotation.x += 0.05;
                } else if (keyCode == 70) {
                    console.log("F");
                    var nodeHead = scope.scene.getObjectByName("jointLeft", true);
                    if (nodeHead)
                        nodeHead.rotation.x += -0.05;
                } else if (keyCode == 86) {
                    console.log("V");
                    var nodeHead = scope.scene.getObjectByName("jointLeft", true);
                    if (nodeHead)
                        nodeHead.rotation.x += 0.05;
                } else if (keyCode == 72) {
                    console.log("H");
                    var nodeHead = scope.scene.getObjectByName("jointRight", true);
                    if (nodeHead)
                        nodeHead.rotation.x += -0.05;
                } else if (keyCode == 78) {
                    console.log("N");
                    var nodeHead = scope.scene.getObjectByName("jointRight", true);
                    if (nodeHead)
                        nodeHead.rotation.x += 0.05;
                }
            };


            this.addBufferGeometry = function (bufferGeometry) {
                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh);

            };

            // this.addBasicBufferGeometry = function (boxGeometry) {
            //     scope.currentMesh = boxGeometry;
            //     scope.scene.add(boxGeometry);
            // };

            this.addLight = function(light) {
                if (light instanceof THREE.Light) {
                    scope.scene.add(light);
                    if (light instanceof  THREE.DirectionalLight) {
                        scope.currentDirectionalLight = light;
                    }
                }
            };

            
            // this.addObjMesh = function (mesh) {
            //     console.log(mesh);
            //     mesh.position.z = 970;
            //     scope.scene.add(mesh);
            // };


            this.addMesh = function (mesh) {
                scope.currentMesh = mesh;
                scope.scene.add(scope.currentMesh);

                // scope.scene.addMesh(robot.getMesh());
            };

            
            this.draw = function () {
                var explosion = scope.scene.getObjectByName('explosion');
                if(explosion){
                    explosion.material.uniforms['time'].value = .00035 * (Date.now() - start);
                }
                requestAnimFrame(scope.draw);
                scope.renderer.render(scope.scene, scope.camera);
            };


            // this.getScope = function () {
            //     return this;
            // };
            //
            //
            // var rotateFinger = 1;
            // var rotateFeet = 1;
            // var rotateTeeth = 1;
            //
            // var fingerAt = 1;
            //
            // this.animateFinger = function () {
            //     var nodeHead = scope.scene.getObjectByName("fingerJointRight", true);
            //     var nodeHead2 = scope.scene.getObjectByName("fingerJointLeft", true);
            //
            //     if (rotateFinger == 1) {
            //         if (fingerAt == 1) {
            //             nodeHead.rotation.x -= 0.05;
            //             nodeHead2.rotation.x -= 0.05;
            //             if (nodeHead.rotation.x <= -1.5 && nodeHead2.rotation.x <= -1.5) {
            //                 fingerAt = 2;
            //             }
            //         } else if (fingerAt == 2) {
            //             nodeHead.rotation.x += 0.5;
            //             nodeHead2.rotation.x += 0.5;
            //             if (nodeHead.rotation.x >= 0 && nodeHead2.rotation.x >= 0) {
            //                 fingerAt = 1;
            //             }
            //         }
            //     }
            // };
            //
            // var feetAt = 1;
            //
            // this.animateWalk = function () {
            //     var nodeHead4 = scope.scene.getObjectByName("jointLeft", true);
            //     var nodeHead5 = scope.scene.getObjectByName("jointRight", true);
            //
            //
            //     // if (rotateFeet == 1) {
            //     //     if (feetAt == 1) {
            //     //         nodeHead4.rotation.x -= 0.05;
            //     //         nodeHead5.rotation.x += 0.05;
            //     //         if (nodeHead4.rotation.x <= 3 && nodeHead5.rotation.x <= -3) {
            //     //             feetAt = 2;
            //     //         }
            //     //     } else if (feetAt == 2) {
            //     //         nodeHead4.rotation.x += 0.5;
            //     //         nodeHead5.rotation.x -= 0.05;
            //     //         if (nodeHead4.rotation.x >= -3 && nodeHead5.rotation.x >= 3) {
            //     //             feetAt = 1;
            //     //         }
            //     //     }
            //     // }
            // };
            //
            // var teethAt = 1;
            //
            // this.animateTeeth = function () {
            //     var nodeHead3 = scope.scene.getObjectByName("tooth1", true);
            //     if (rotateTeeth == 1) {
            //         if (teethAt == 1) {
            //             nodeHead3.rotation.x -= 0.05;
            //             if (nodeHead3.rotation.x <= 0) {
            //                 teethAt = 2;
            //             }
            //         } else if (teethAt == 2) {
            //             nodeHead3.rotation.x += 0.05;
            //             if (nodeHead3.rotation.x >= 1) {
            //                 teethAt = 3;
            //             } else if (teethAt == 3) {
            //                 nodeHead3.rotation.x -= 0.02;
            //                 if (nodeHead3.rotation.x >= 0.05) {
            //                     teethAt = 2;
            //                     // } else if (teethAt == 3) {
            //                     //     nodeHead3.rotation.x -= 0.025;
            //                     //     if (nodeHead3.rotation.x >= 0.05) {
            //                     //         teethAt = 2;
            //                     //     }
            //                 }
            //             }
            //         }
            //     }
            //
            // }
        };
        


        // this module only exports the constructor for Scene objects
        return Scene;

    }); // define

    
