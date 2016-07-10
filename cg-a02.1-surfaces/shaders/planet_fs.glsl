precision mediump float;

#define MAX_DIR_LIGHTS 1
// uniform lights (we only have the sun)
uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];

//uniform vec3 ambientLightColor;

// uniform material constants k_a, k_d, k_s, alpha
uniform vec3 diffuseMaterial;
uniform vec3 specularMaterial;
uniform vec3 ambientMaterial;
uniform float shininessMaterial;

// uniform sampler2D textures
uniform sampler2D textureDay;
uniform sampler2D textureCloud;
uniform sampler2D textureNight;
uniform sampler2D textureTopo;

// three js only supports int no bool
// if you want a boolean value in the shader, use int
uniform int showDayTexture;
uniform int showNightTexture;
uniform int showCloudTexture;

// data from the vertex shader
varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;
varying mat4 threeProjectionMatrix;


struct DirectionalLight {
    vec3 direction;
    vec3 color;
    int shadow;
    float shadowBias;
    float shadowRadius;
    vec2 shadowMapSize;
};
uniform DirectionalLight directionalLights[1];

//void main() {
//
//
//    // get color from different textures
//    //vec3 color = texture2D(textureUniform, texCoord).rgb;
//
//    // normalize normal after projection
//
//    // do we use a perspective or an orthogonal projection matrix?
//    //bool usePerspective = projectionMatrix[2][3] != 0.0;
//    // for perspective mode, the viewing direction (in eye coords) points
//    // from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
//    // for orthogonal mode, the viewing direction is simply (0,0,1)
//
//    // calculate color using phong illumination
//    // depending on GUI checkbox:
//    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
//    // color from day texture are added to diffuse term (instead of diffuse material k_d)
//
//    // Note: the texture value might have to get rescaled (gamma corrected)
//    //       e.g. color = pow(color, vec3(0.6))*2.0;
//
//    // vector from light to current point
//    vec3 l = normalize(directionalLightDirection[0]);
//
//
//    // diffuse contribution
//    vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
//    // clouds at day?
//    if(cloudsTextureBool == 1) {
//        //diffuseCoeff = ...
//    }
//
//    // ...
//
//    // final diffuse term for daytime
//    //vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;
//
//    // ambient part contains lights; modify depending on time of day
//    // when ndotl == 1.0 the ambient term should be zero
//
//    vec3 color = vec3(1,0,0); //replace with ambient + diffuse + specular;
//
//    gl_FragColor = vec4(color, 1.0);
//
//}

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 textureDayColor, vec3 textureNightColor, vec3 textureCloudColor, vec3 directionalLightPos, vec3 directionalLightColor){



     if (dot(n, v) < 0.0) {
         return vec3(0,0,0);
     }

     vec3 s = normalize(-directionalLightPos);
     vec3 r = reflect(-s, n);
     float nDotS = max(dot(s, n), 0.0);
     float rDotV = max(dot(r, v), 0.0);


     vec3 ambi = (showNightTexture == 1)? textureNightColor : ambientMaterial;

     vec3 diffuseCoeff = (showDayTexture == 1 )? textureDayColor : diffuseMaterial;

//        if(showCloudTexture == 1) {
//             diffuseCoeff = (1.0-textureCloudColor)*diffuseCoeff + textureCloudColor*vec3(1,1,1);
//        }

     vec3 diff =  diffuseCoeff * directionalLightColor[0] * nDotS;

     vec3 spec = specularMaterial * pow(rDotV, shininessMaterial ) * directionalLightColor ;

     return pow(1.0 - nDotS,5.0)* ambi + diff + spec;
}

//     vec3 ambi;
//          if (showNightTexture == 1) {
//              ambi = textureNightColor * ambientLightColor;
//          } else {
//              ambi = kA * ambientLightColor;
//          }
//          ambi = ambi * (1.0 - nDotS);
//     vec3 diff;
//          if (showDayTexture == 1) {
//              diff = textureDayColor * directionalLightColor * nDotS;
//          } else {
//              diff = kD * directionalLightColor * nDotS;
//          }
//     vec3 spec = kS * directionalLightColor * pow(rDotV, a);
//
//     if (nDotS <= 0.0) {
//         return ambi;
//     }
//
//     return ambi + diff + spec;
// }

 void main() {

     vec3 dayColor = texture2D(textureDay, vUv).rgb;
     vec3 nightColor = texture2D(textureNight, vUv).rgb;
     vec3 cloudColor = texture2D(textureCloud, vUv).rgb;




     vec3 color = phong(ecPosition.xyz, ecNormal, viewDir, dayColor, nightColor, cloudColor,  directionalLightDirection[0], directionalLightColor[0]);

     gl_FragColor = vec4(color, 1);
// gl_FragColor = vec4(directionalLights[0].color, 1.0);
 }