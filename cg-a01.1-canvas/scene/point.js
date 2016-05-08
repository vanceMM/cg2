/*
 * Module: point
 *
 * A Point knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        var Point = function (center, r, style) {

            console.log("creating circle with middlepoint [" + center[0] + "," + center[1] + "] and " +
                "radius" + r + ".");

            // this.lineStyle = lineStyle || {width: "2", color: "#0000A"};
            this.color = style.color || "#ff0000";
            this.center = center;
            this.r = r;
        };

        //draw the circle
        Point.prototype.draw = function (context) {

            // draw the path
            context.beginPath();

            // set the arc to be drawn
            context.arc(this.center[0], this.center[1], this.r, 0, 2 * Math.PI,true);

            //set the drawing style
            // context.lineWidth = this.lineStyle.width;
            // context.strokeStyle = this.lineStyle.color;
            // context.fillStyle = "black";
            context.fillStyle = this.color;
            context.closePath();
            context.fill();

            // start drawing
            context.stroke();

        };

        Point.prototype.isHit = function (context, pos) {

            // create vector bewtween circle mid and clicked position
            var v = vec2.sub(this.center, pos);
            // lenght of the vector substracted by the radius
            var d = vec2.length(v)-this.r;
            // give a tolerance of 5
            if (d > 5 || d < -5) {
                return false;
            }
            return true;
        };

        Point.prototype.createDraggers =  function () {

            var draggerStyle = {r: 1, width: 0}
            var draggers = [];

            var _point = this;

            var getM0 = function () {
                return _point.center;
            };
            var setM0 = function (dragEvent) {
                _point.center = dragEvent.position;
                // console.log('i am here 1');
            };
            draggers.push(new PointDragger(getM0, setM0, draggerStyle));

            return draggers;

        };

        //this module only exports the constructor for Point objects
        return Point;

    }));