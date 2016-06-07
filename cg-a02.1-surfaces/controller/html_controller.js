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
define(["jquery", "BufferGeometry", "random", "band", "ellipsoid", "parametric"],
    (function($,BufferGeometry, Random, Band, Ellipsoid, Parametric) {
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
            $("#objects").hide();


            $("#btnRandom").click( (function() {
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#random").show();
                $("#objects").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#band").show();
                $("#objects").hide();

            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").show();
                $("#objects").hide();
            }));

            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").show();
                $("#ellipsoid").hide();
                $("#objects").hide();
            }));

            $("#btnObjects").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#ellipsoid").hide();
                $("#objects").show();
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));


            $("#btnNewCube").click( (function() {
                

            }));


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

                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
            }));


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

                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());
                
                scene.addBufferGeometry(bufferGeometryParametric);
            }));


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
