 attribute vec3 vertexPosition;
 uniform mat4 modelViewMatrix;
 uniform mat4 projectionMatrix;
 
 void main() {
 	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition,1.0);
 	gl_PointSize = 6.0;
 } 
 