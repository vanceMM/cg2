precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;

//varying mat4 threeProjectionMatrix;


void main() {
//    mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

    ecPosition = modelViewMatrix * vec4(position, 1.0);
    ecNormal = normalMatrix * normal;
    vUv = uv;

//    threeProjectionMatrix = projectionMatrix;

         bool useOtho = projectionMatrix[2][3] < 0.1;
         vec3 viewDir = useOtho ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);

    gl_Position = projectionMatrix * ecPosition; //vec4(position, 1.0);
}
