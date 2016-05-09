/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Point", "ParametricCurve", "BezierCurve"],
    (function($, Line, Circle, Point, ParametricCurve, BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {


            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random()*(context.canvas.width-10))+5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {
                return Math.floor(Math.random()*(context.canvas.height-10))+5;
            };

            // generate random color in hex notation
            var randomColor = function() {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function(byte) {
                    var s = byte.toString(16); // convert to hex string
                    if(s.length == 1) s = "0"+s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random()*25.9)*10;
                var g = Math.floor(Math.random()*25.9)*10;
                var b = Math.floor(Math.random()*25.9)*10;

                // convert to hex notation
                return "#"+toHex2(r)+toHex2(g)+toHex2(b);
            };

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var line = new Line( [randomX(),randomY()],
                    [randomX(),randomY()],
                    style );
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));

            /*
                event handler for "new circle button".
             */
            $("#btnNewCircle").click( (function () {

                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                console.log("circle");

                var circle = new Circle([randomX(), randomY()], Math.random()*50+10, style);
                
                scene.addObjects([circle]);
                sceneController.deselect();
                sceneController.select(circle);

            }));

            /*
                event handler for "new Point button".
             */
            $("#btnNewPoint").click( (function () {

                console.log("point");

                var point = new Point([randomX(), randomY()], 2);
                console.log(Point);
                scene.addObjects([point]);
                sceneController.deselect();

            }));

            $("#btnNewParametricCurve").click( (function () {

            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };

            console.log("Parametric Curve");

            var parametricCurve = new ParametricCurve($("#x").val(),
                                        $("#y").val(),
                                        parseFloat($("#tMin").val()),
                                        parseFloat($("#tMax").val()),
                                        parseInt($("#segments").val()), style);

            scene.addObjects([parametricCurve]);
            console.log(parametricCurve);

            sceneController.deselect();
            sceneController.select(parametricCurve);

            }));

            $("#btnNewBezierCurve").click( (function () {

                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                console.log("bezier curve");

            var p0 = [randomX(),randomY()];
            var p1 = [randomX(),randomY()];
            var p2 = [randomX(),randomY()];
            var p3 = [randomX(),randomY()];
            
            var bezierCurve = new BezierCurve(p0, p1, p2, p3, style);
            
            scene.addObjects([bezierCurve]);
            
            console.log(bezierCurve);
            sceneController.deselect();
            sceneController.select(bezierCurve);
   
            }));

    };

        // return the constructor function
        return HtmlController;


    })); // require



            
