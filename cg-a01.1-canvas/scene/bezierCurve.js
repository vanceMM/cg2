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
define(["util", "vec2", "Scene","PointDragger"],
    (function (util, vec2, Scene, PointDragger) {

        "use strict";

        /**
         *  A simple Bezier Curve that can be dragged
         *  around by its endpoints.
         */

        var BezierCurve = function (p0, p1, p2, p3, lineStyle) {

            console.log("creating a Bezier Curve ");

            // draw style for drawing the Bezier Curve
            this.lineStyle = lineStyle || {width: "2", color: "#0000AA"};

            // initial values in case either point is undefined
            this.tMin = 0;
            this.tMax = 1;
            this.segments = 40;

            // Kontroll polygon (p0, p1, p2, p3)
            this.p0 = p0 || [10, 20];
            this.p1 = p1 || [30, 40];
            this.p2 = p2 || [50, 60];
            this.p3 = p3 || [70, 80];

            // Bernstein Polynome 
            this.b30 = function(t) { return Math.pow(1 - t, 3);};
            this.b31 = function(t) { return 3 * Math.pow(1 - t, 2) * t; };
            this.b32 = function(t) { return 3 * t * t * (1 - t); };
            this.b33 = function(t) { return t * t * t }; 
            var that = this;
            this.x = function(t) {          
                return (that.p0[0] * that.b30(t) + 
                        that.p1[0] * that.b31(t) +
                        that.p2[0] * that.b32(t) +
                        that.p3[0] * that.b33(t)); 
            };      
            this.y = function(t) {
                return (that.p0[1] * that.b30(t) + 
                        that.p1[1] * that.b31(t) +
                        that.p2[1] * that.b32(t) +
                        that.p3[1] * that.b33(t)); 
            };
        };

    BezierCurve.prototype.draw = function (context) {

        context.beginPath();
        // draw curve
        var t = this.minT
        context.moveTo(this.x(t),this.y(t));
        for (var i = 0; i <= this.segments; i++) {

            t = this.tMin + (i/this.segments)*(this.tMax-this.tMin);
            context.lineTo(this.x(t),this.y(t));
        }
        // draw controlpoint connection
        context.moveTo(this.p0[0], this.p0[1]);
        console.log('P0 x: ' + this.p0[0] + ' P0 y: ' + this.p0[1]);
        context.lineTo(this.p1[0], this.p1[1]);
        console.log('P1 x: ' + this.p1[0] + ' P1 y: ' + this.p1[1]);
        context.lineTo(this.p2[0], this.p2[1]);
        console.log('P2 x: ' + this.p2[0] + ' P2 y: ' + this.p2[1]);
        context.lineTo(this.p3[0], this.p3[1]);
        console.log('P3 x: ' + this.p3[0] + ' P3 y: ' + this.p3[1]);
        // context.closePath();

        
        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;
        context.stroke();

    };
    
    BezierCurve.prototype.isHit = function (context, pos) {
        // if(pos[0] >= p0[0] && pos[0] <= p3[0])

        return false;

    };
        


    // return draggers to manipulate
    BezierCurve.prototype.createDraggers = function() {
        var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
        var draggers = [];      

        var that = this;
        var getP0 = function() { return that.p0; };
        var getP1 = function() { return that.p1; };
        var getP2 = function() { return that.p2; };
        var getP3 = function() { return that.p3; };
        var setP0 = function(dragEvent) { that.p0 = dragEvent.position; };
        var setP1 = function(dragEvent) { that.p1 = dragEvent.position; };
        var setP2 = function(dragEvent) { that.p2 = dragEvent.position; };
        var setP3 = function(dragEvent) { that.p3 = dragEvent.position; };
        draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
        draggers.push( new PointDragger(getP1, setP1, draggerStyle) );
        draggers.push( new PointDragger(getP2, setP2, draggerStyle) );
        draggers.push( new PointDragger(getP3, setP3, draggerStyle) );        
        draggers.push( new BezierCurve(that) );        
        
        return draggers;        
    }; 

    return BezierCurve;

}));