/*
* Module: circle
*
* A StraighLine knows how to draw itself into a specified 2D context,
* can tell whether a certain mouse position "hits" the object,
* and implements the function createDraggers() to create a set of
* draggers to manipulate itself.
*
*/


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        var Circle = function (mpoint, radius, lineStyle) {

            console.log("creating circle with middlepoint [" + mpoint[0] + "," + mpoint[1] + "] and " +
                "radius" );

            this.lineStyle = lineStyle || {width: "2", color: "#0000A"};

            this.mpoint = mpoint;
            this.radius = radius;
        };

        //draw the circle
        Circle.prototype.draw = function (context) {

            // draw the path
            context.beginPath();

            // set the arc to be drawn
            context.arc(this.mpoint[0], this.mpoint[1], this.radius, 0, 2 * Math.PI);

            //set the drawing style
            context.lineWidth = this.lineStyle.width;
            context.strokeStyle = this.lineStyle.color;

            // start drawing
            context.stroke();

        };

        //test wheter the mouse position is on the circle
        Circle.prototype.isHit = function (context, pos) {

            // create vector bewtween circle mid and clicked position
            var v = vec2.sub(this.mpoint, pos);
            // lenght of the vector substracted by the radius
            var d = vec2.length(v)-this.radius;
            // give a tolerance of 5
            if (d > 5 || d < -5) {
                return false;
            }
            return true;
        };

        // return list of draggers to manipulate this circle(right now online mid point)
        Circle.prototype.createDraggers =  function () {

            var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
            var draggers = [];

            var _circle = this;
            var getM0 = function () {
                return _circle.mpoint;
            };

            var setM0 = function (dragEvent) {
                _circle.mpoint = dragEvent.position;
            };
            draggers.push(new PointDragger(getM0, setM0, draggerStyle));

            return draggers;

        }

        Circle.prototype.getWidth = function() {
            return this.lineStyle.color;
        };

        Circle.prototype.setWidth = function (width) {
            this.lineStyle.width = width;
        }

        Circle.prototype.getColor = function () {
            return this.lineStyle.color;
        }

        Circle.prototype.setColor = function (color) {
            this.lineStyle.color = color;
        }

        //this module only exports the constructor for Circle objects
        return Circle;

    }));