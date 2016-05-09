/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * A ParametricCurve knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        /**
         *  A simple Parametric Curve that can be dragged
         *  around by its endpoints.
         */

        var ParametricCurve = function (x, y, tMin, tMax, segments, lineStyle) {

            console.log("creating a Parametric Curve ");

            // draw style for drawing the Parametric Curve
            this.lineStyle = lineStyle || {width: "2", color: "#0000AA"};

            // initial values in case either point is undefined
            this.x = x || "100*Math.cos(t)";
            this.y = y || "50*Math.sin(t*2)";
            this.tMin = tMin || 0;
            this.tMax = tMax || 1;
            this.segments = segments || 40;
            // this.points = [];

        };

        // draw this line into the provided 2D rendering context
        ParametricCurve.prototype.draw = function (context) {

            // set up to be drawn
            context.beginPath();

            var t = this.tMin;

            try{
                context.moveTo(eval(this.x)*Math.cos(t), eval(this.y)*Math.sin(t*2));
                // context.moveTo(this.x*Math.cos(t), this.y*Math.sin(t*2));
                    // t = t_min + N/N * (t_max-t_min)
                    for (var i=1;i<=this.segments;i++){
                        t = this.tMin + (i/this.segments)*(this.tMax-this.tMin);
                        context.lineTo(eval(this.x)*Math.cos(t), eval(this.y)*Math.sin(t*2));
                }
            }catch (e){
                this.x = null;
                this.y = null;
                alert('Fehlerhinweis');
            }
            // set drawing style
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;

            // actually start drawing
            context.stroke();

        };

    //test wheter the mouse position is on the Parametric Curve
    ParametricCurve.prototype.isHit = function (context, pos) {

        return false;

    };

    //return list of draggers to manipulate
    ParametricCurve.prototype.createDraggers =  function () {

         var draggers = [];

        return draggers;

    };

    return ParametricCurve;

}));