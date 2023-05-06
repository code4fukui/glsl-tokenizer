import { tokenizeString } from "./string.js";

// from https://wgld.org/s/webgl2/sample_003/
const src = `#version 300 es
precision highp float;

uniform vec3 lightPosition;
uniform vec3 eyePosition;
uniform sampler2D texture2dSampler;

in vec3 vPosition;
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 outColor;

void main(){
    vec3 light = normalize(lightPosition - vPosition);
    vec3 eye = normalize(vPosition - eyePosition);
    vec3 ref = normalize(reflect(eye, vNormal));
    float diffuse = max(dot(light, vNormal), 0.2);
    float specular = max(dot(light, ref), 0.0);
    specular = pow(specular, 20.0);
    vec4 samplerColor = texture(texture2dSampler, vTexCoord);
    outColor = vec4(samplerColor.rgb * diffuse + specular, samplerColor.a);
}
`;
const tokens = tokenizeString(src, {
  version: '300 es'
});
console.log(tokens);

