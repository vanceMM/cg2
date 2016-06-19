/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry","BufferGeometryPoints", "random", "band", "parametric" ,"objLoader", "loader"],
    (function($,BufferGeometry, BufferGeometryPoints, Random, Band, Parametric , OBJLoader, Loader) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
            $("#ellipsoid").hide();
            $("#parametric").hide();
            $("#obj_loader").hide();


            $("#btnRandom").click( (function() {
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#random").show();
                $("#obj_loader").hide();

            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#band").show();
                $("#obj_loader").hide();


            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").show()
                $("#obj_loader").hide();

            }));

            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").show();
                $("#ellipsoid").hide();
                $("#obj_loader").hide();
            }));

            $("#btnOBJ").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#obj_loader").show();
            }));

            /**
             * variables for checkboxes
             */

            var solid = false;
            var wireframe = false;
            var points = false;


            $(".checkboxes").click( function () {
                if($("#bandPointsCheckbox").attr("checked")) {
                    points = true;
                } else {
                    points = false;
                }
                if($("#bandWireframeCheckbox").attr("checked")) {
                    wireframe = true;
                } else {
                    wireframe = false;
                }
                if($("#bandSolidCheckbox").attr("checked")) {
                    solid = true;
                } else {
                    solid = false;
                }

            });

            //********* Basic Shapes ***********//

            /**
             * Box Geometry
             */
            $("#btnBox").click(function () {
                var geometry = new THREE.BoxBufferGeometry( 300, 300, 300 );
                var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                var cube = new THREE.Mesh( geometry, material );
                scene.addBasicBufferGeometry( cube );
            });
            /**
             * Sphere Geometry
             */
            $("#btnSphere").click(function () {
                var geometry = new THREE.SphereBufferGeometry( 500, 32, 32 );
                var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
                var sphere = new THREE.Mesh( geometry, material );
                scene.addBasicBufferGeometry( sphere );
            });
            /**
             * Circle Geometry
             */
            $("#btnCircle").click(function() {
                var geometry = new THREE.CircleGeometry( 500, 32 );
                var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
                var circle = new THREE.Mesh( geometry, material );
                scene.addBasicBufferGeometry( circle );
            });
            /**
             *  Random Point Cloud
             */
            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry(points, wireframe, solid);
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));

            /**
             * Band Geometry
             */
            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };
                
                var band = new Band(config);

                var bufferGeometryBand = new BufferGeometry(points, wireframe, solid);
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());
                bufferGeometryBand.setIndex(band.getIndices());
                scene.addBufferGeometry(bufferGeometryBand);
            }));


            /**
             * Elipsoid Geometry
             */
            $("#btnNewEllipsoid").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsEllipsoid").attr("value")),
                    uMin : 0,
                    uMax : 2*Math.PI+0.125,
                    vMin : 0,
                    vMax : Math.PI
                };

                var a = ($("#constA").attr("value"));
                var b = ($("#constB").attr("value"));
                var c = ($("#constC").attr("value"));
                var s = ($("#size").attr("value"));

                var posFunc = function(u,v) {
                    var x = eval(a*Math.cos(u)*Math.cos(v)*s);
                    var y = eval(b*Math.cos(u)*Math.sin(v)*s);
                    var z = eval(c*Math.sin(u)*s);
                    return [x,y,z];
                };


                var parametric = new Parametric(posFunc, config);

                var bufferGeometryParametric = new BufferGeometry(points, wireframe, solid);
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());
                bufferGeometryParametric.setIndex(parametric.getIndices());

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            /**
             * Parametric Surface GEometry
             */
            $("#btnNewParametric").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    uMin : parseInt($("#minU").attr("value")),
                    uMax : parseInt($("#maxU").attr("value")),
                    vMin : parseInt($("#minV").attr("value")),
                    vMax : parseInt($("#maxV").attr("value")),
                };

                var posFunc = function(u,v) {
                    var x = eval($("#x").attr("value"));
                    var y = eval($("#y").attr("value"));
                    var z = eval($("#z").attr("value"));
                    return [x,y,z];
                };

                var parametric = new Parametric(posFunc, config);

                var bufferGeometryParametric = new BufferGeometry(points, wireframe, solid);
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());
                
                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            /**
             *
             * @type {HtmlController} the controller is passed to the loader class which calls the addMesh MEthod
             * in its callback.
             */

            var controller = this; // get controler in the scope

            $("#btnNewOBJ").click((function () {

                var myOBJMesh = new Loader(controller);
                myOBJMesh.getMesh();

            }));

            this.addMesh = function (mesh) {
                scene.addObjMesh(mesh);
            }


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
