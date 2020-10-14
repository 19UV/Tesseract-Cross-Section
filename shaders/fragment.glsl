precision mediump float;

varying vec3 v_color;
// varying vec4 v_normal;

void main()
{
  // vec3 normal = normalize(v_normal.xyz);
  // float light = dot(normal, normalize(vec3(0.5, 0.7, 1)));
  gl_FragColor = vec4(v_color, 1);
  // gl_FragColor.rgb *= light;
}