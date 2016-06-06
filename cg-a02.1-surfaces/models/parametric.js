/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {

            var segments = config.segments;
            // var uSegments = config.uSegments;
            // var vSegments = config.vSegments;
            var uMin = config.uMin;
            var uMax = config.uMax;
            var vMin = config.vMin;
            var vMax = config.vMax;

            var positionFunc = posFunc;

            this.positions = new Float32Array((segments+1) * (segments+1) * 3);
            this.colors = new Float32Array((segments+1) * (segments+1) * 3);

            var color = new THREE.Color();
            
            for(var i=0; i<segments+1; i++) {
                for(var j=0; j<segments+1; j++) {
                    
                    var u = uMin + i * (uMax-uMin)/segments;
                    var v = vMin + j * (vMax-vMin)/segments;
                    
                    var coords = positionFunc(u,v);
                    
                    var index = ( j + i * (segments+1) ) * 3;

                    this.positions[ index ]     = coords[0];
                    this.positions[ index + 1 ] = coords[1];
                    this.positions[ index + 2 ] = coords[2];

                    color.setRGB( 1,0,0 );

                    this.colors[ index ]     = color.r;
                    this.colors[ index + 1 ] = color.g;
                    this.colors[ index + 2 ] = color.b;
                }
            };

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };
        };


        return ParametricSurface;
    }));

