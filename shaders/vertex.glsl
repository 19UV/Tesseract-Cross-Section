attribute vec4 a_position;
attribute vec3 a_color;
// attribute vec4 a_normal;

varying vec3 v_color;
// varying vec4 v_normal;

const float fudge_factor = 0.25;

void main()
{
  vec4 vert_pos = a_position;
  vert_pos.x *= 0.5625;

  float zToDivideBy = 1.0 + vert_pos.z * fudge_factor;

  vert_pos.xy /= zToDivideBy;

  v_color = a_color;
  // v_normal = a_normal;
  gl_Position = vec4(vert_pos);
}