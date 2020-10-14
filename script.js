"use strict";

console.log("TESSERACT EXAMPLE v2.0.1");

import { Lerp } from "./modules/func.js";
import { mult_mat_vec } from "./modules/math.js";
import { createShader, createProgram } from "./modules/shader_build.js";

var verts = [];
var tets = [];

const RAD_360 = 2*Math.PI;

const COLOR = {
  "RED": [1,0,0], // 255, 0, 0
  "ORANGE": [1, 0.6, 0], // 255,165,0
  "YELLOW": [1, 1, 0], // 255, 255, 0
  "L_GREEN": [0.5, 1, 0.5], // 128,255,128
  "GREEN": [0, 1, 0], // 0, 255, 0
  "L_BLUE": [0.5, 0.5, 1], // 128, 128, 255
  "BLUE": [0, 0, 1], // 0, 0, 255
  "PURPLE": [1, 0, 1] // 255, 0, 255
}

const NORM = {
  "PX": [1,0,0,0],
  "PY": [0,1,0,0],
  "PZ": [0,0,1,0],
  "PW": [0,0,0,1],

  "NX": [-1,0,0,0],
  "NY": [0,-1,0,0],
  "NZ": [0,0,-1,0],
  "NW": [0,0,0,-1]
}

/*
Vertex Constructor
4 floats: Position
3 floats: Color
4 floats: Normal
*/

verts = new Array(16*4);
verts[ 0] = [ 1, 1, 1, 1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[ 1] = [ 1, 1, 1, 1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[ 2] = [ 1, 1, 1, 1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[ 3] = [ 1, 1, 1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[ 4] = [-1, 1, 1, 1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[ 5] = [-1, 1, 1, 1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[ 6] = [-1, 1, 1, 1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[ 7] = [-1, 1, 1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[ 8] = [-1,-1, 1, 1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[ 9] = [-1,-1, 1, 1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[10] = [-1,-1, 1, 1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[11] = [-1,-1, 1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[12] = [ 1,-1, 1, 1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[13] = [ 1,-1, 1, 1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[14] = [ 1,-1, 1, 1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[15] = [ 1,-1, 1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[16] = [ 1, 1,-1, 1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[17] = [ 1, 1,-1, 1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[18] = [ 1, 1,-1, 1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[19] = [ 1, 1,-1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[20] = [-1, 1,-1, 1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[21] = [-1, 1,-1, 1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[22] = [-1, 1,-1, 1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[23] = [-1, 1,-1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[24] = [-1,-1,-1, 1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[25] = [-1,-1,-1, 1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[26] = [-1,-1,-1, 1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[27] = [-1,-1,-1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner

verts[28] = [ 1,-1,-1, 1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[29] = [ 1,-1,-1, 1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[30] = [ 1,-1,-1, 1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[31] = [ 1,-1,-1, 1, ...COLOR.BLUE   , ...NORM.PW]; // Inner


verts[32] = [ 1, 1, 1,-1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[33] = [ 1, 1, 1,-1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[34] = [ 1, 1, 1,-1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[35] = [ 1, 1, 1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[36] = [-1, 1, 1,-1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[37] = [-1, 1, 1,-1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[38] = [-1, 1, 1,-1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[39] = [-1, 1, 1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[40] = [-1,-1, 1,-1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[41] = [-1,-1, 1,-1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[42] = [-1,-1, 1,-1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[43] = [-1,-1, 1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[44] = [ 1,-1, 1,-1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[45] = [ 1,-1, 1,-1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[46] = [ 1,-1, 1,-1, ...COLOR.YELLOW , ...NORM.PZ]; // Front
verts[47] = [ 1,-1, 1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[48] = [ 1, 1,-1,-1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[49] = [ 1, 1,-1,-1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[50] = [ 1, 1,-1,-1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[51] = [ 1, 1,-1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[52] = [-1, 1,-1,-1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[53] = [-1, 1,-1,-1, ...COLOR.RED    , ...NORM.PY]; // Top
verts[54] = [-1, 1,-1,-1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[55] = [-1, 1,-1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[56] = [-1,-1,-1,-1, ...COLOR.ORANGE , ...NORM.NX]; // Left
verts[57] = [-1,-1,-1,-1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[58] = [-1,-1,-1,-1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[59] = [-1,-1,-1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

verts[60] = [ 1,-1,-1,-1, ...COLOR.L_GREEN, ...NORM.PX]; // Right
verts[61] = [ 1,-1,-1,-1, ...COLOR.L_BLUE , ...NORM.NY]; // Bottom
verts[62] = [ 1,-1,-1,-1, ...COLOR.GREEN  , ...NORM.NZ]; // Back
verts[63] = [ 1,-1,-1,-1, ...COLOR.PURPLE , ...NORM.NW]; // Outer

var const_rect_prism = (vts) => {
  if (vts.length != 8) return; // If incorrect number, ignore
  const indicies = [[0,1,3,4],[1,2,3,6],[1,3,4,6],[1,4,5,6],[3,4,6,7]];
  indicies.forEach((ind) => {
    var bld = [0,0,0,0];
    for(var i=0;i<4;i++) bld[i]=vts[ind[i]];
    tets.push(bld);
  });
}

function HTTP_Get(url, callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        callback(req.responseText.trim());
    }
  };
  req.open("GET", url, true);
  req.send();
}

var W_LEVEL = 0;
var canvas_dim = [192, 108]; var aspect_ratio = 1;

var c, gl;
var program;
var pos_attrib_loc, positionBuffer;
var col_attrib_loc, colorBuffer;
// var norm_attrib_loc, normalBuffer;
var fragment_source, vertex_source;

var r_XY = 0;
var r_XZ = 0;
var r_YZ = 0;
var r_XW = 0;
var r_YW = 0;
var r_ZW = 0;

function rotatePoint(pt, a, b, theta) {
  var sp = pt.slice(0);

  var sin_t = Math.sin(theta);
  var cos_t = Math.cos(theta);

  pt[a] = sp[a] * cos_t - sp[b] * sin_t;
  pt[b] = sp[b] * cos_t + sp[a] * sin_t;
  
  pt[a+7] = sp[a+7] * cos_t - sp[b+7] * sin_t;
  pt[b+7] = sp[b+7] * cos_t + sp[a+7] * sin_t;
  return pt;
}

function resize() {
  aspect_ratio = Math.min(window.innerWidth/192, window.innerHeight/108);
  canvas_dim = [192*aspect_ratio, 108*aspect_ratio];
  c.width = canvas_dim[0];
  c.height = canvas_dim[1];
}

window.addEventListener("load", load);
function load() {
  console.log("LOADING VERTEX AND FRAGMENT SHADERS...");
  var to_load = 2;
  HTTP_Get("shaders/fragment.glsl", (data) => {
    console.log(" Loaded Fragment Shader");
    fragment_source = data;
    to_load--;
    if (to_load == 0) init();
  });
  HTTP_Get("shaders/vertex.glsl", (data) => {
    console.log(" Loaded Vertex Shader");
    vertex_source = data;
    to_load--;
    if (to_load == 0) init();
  });
}

function init() {
  c = document.getElementById("canvas");
  gl = c.getContext("webgl");

  if (!gl) {
    console.log("Error: WebGL Not Available on Device");
    alert("Error: WebGL Not Available on Device");
    return;
  }
  
  gl.clearColor(0, 0, 0, 0);
  gl.disable(gl.CULL_FACE);
  gl.disable(gl.DITHER);
  gl.enable(gl.DEPTH_TEST);


  var vertex_shader = createShader(gl, gl.VERTEX_SHADER, vertex_source);
  var fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, fragment_source);
  program = createProgram(gl, vertex_shader, fragment_shader);
  
  pos_attrib_loc  = gl.getAttribLocation(program, "a_position");
  col_attrib_loc  = gl.getAttribLocation(program, "a_color");
  // norm_attrib_loc = gl.getAttribLocation(program, "a_normal");
  
  positionBuffer = gl.createBuffer();
  colorBuffer = gl.createBuffer();
  // normalBuffer = gl.createBuffer();
  
  // Assumed Correct
  const_rect_prism([ 3, 7,11,15,19,23,27,31]); // Inner
  const_rect_prism([35,39,43,47,51,55,59,63]); // Outer

  const_rect_prism([ 2, 6,10,14,34,38,42,46]); // Front
  const_rect_prism([18,22,26,30,50,54,58,62]); // Back
  const_rect_prism([32, 0,12,44,48,16,28,60]); // Right
  const_rect_prism([ 4,36,40, 8,20,52,56,24]); // Left
  const_rect_prism([33,37, 5, 1,49,53,21,17]); // Top
  const_rect_prism([13, 9,41,45,29,25,57,61]); // Bottom
  window.addEventListener("resize", resize); resize();

  render();
}

var fps_start, fps_end, fps;
function render() {
  r_XW += 0.01;
  r_YW += 0.001;
  r_ZW += 0.005
  // W_LEVEL = Math.sin((new Date()).getTime() / 1000);
  
  // Should Fix Some Floating Point Errors
  if (r_XY > RAD_360) r_XY -= RAD_360;
  if (r_XZ > RAD_360) r_XZ -= RAD_360;
  if (r_YZ > RAD_360) r_YZ -= RAD_360;
  if (r_XW > RAD_360) r_XW -= RAD_360;
  if (r_YW > RAD_360) r_YW -= RAD_360;
  if (r_ZW > RAD_360) r_ZW -= RAD_360;

  var tri_count = 0; var quad_count = 0;
  
  var vert4 = JSON.parse(JSON.stringify(verts));
  vert4.map((v) => rotatePoint(v, 0, 1, r_XY));
  vert4.map((v) => rotatePoint(v, 1, 2, r_YZ));
  vert4.map((v) => rotatePoint(v, 0, 2, r_XZ));
  
  vert4.map((v) => rotatePoint(v, 0, 3, r_XW));
  vert4.map((v) => rotatePoint(v, 1, 3, r_YW));
  vert4.map((v) => rotatePoint(v, 2, 3, r_ZW));

  var vert3 = [];
  const edges = [[0,1],[0,2],[0,3],[1,2],[2,3],[1,3]];
  tets.forEach((t) => {
    var pts = new Array(6);
    for (var i=0;i<6;i++) {
      var A = vert4[t[edges[i][0]]];
      var B = vert4[t[edges[i][1]]];

      if(A[3]==B[3]) continue; //               Parallel
      if(W_LEVEL<Math.min(A[3],B[3])) continue; // Below
      if(W_LEVEL>Math.max(A[3],B[3])) continue; // Above

      var n = 1 / (B[3]-A[3]);
      var normal = n * (W_LEVEL - A[3]);
      pts[i] = Lerp(A, B, normal);
    }

    var tri = pts.filter((e)=>e!=undefined); var t_len = tri.length;
    switch(t_len) {
      case 0: break;
      case 3: tri_count++;
        tri.forEach((t) => vert3.push(t));
        break;
      case 4: quad_count++;
        [0,1,2,1,2,3,2,3,0,3,0,1].forEach((i) => vert3.push(tri[i]));
        // [0,1,2,1,2,3,3,0,1].forEach((i) => vert3.push(tri[i]));
        // [0,1,2,1,2,3].forEach((i) => vert3.push(tri[i]));
        break;
      default:
        console.log("SOMETHING WENT WRONG");
        break;
    }
  });
  
  var positions = [];
  var colors = [];
  var normals = [];

  vert3.forEach((v) => {
    positions = positions.concat(v.slice(0,3));
    colors = colors.concat(v.slice(4,7));
    normals = normals.concat(v.slice(7,10));
  });

  positions = positions.map((p)=>p*0.5);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
  // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(pos_attrib_loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(pos_attrib_loc, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(col_attrib_loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(col_attrib_loc, 3, gl.FLOAT, false, 0, 0);
  
  // gl.enableVertexAttribArray(norm_attrib_loc);
  // gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // gl.vertexAttribPointer(norm_attrib_loc, 3, gl.FLOAT, false, 0, 0); // Potential true
  
  gl.drawArrays(gl.TRIANGLES, 0, vert3.length);

  fps_end = (new Date()).getTime();
  fps = Math.floor((fps||0)*0.8 + (1000 / (fps_end - fps_start))*0.2);
  fps_start = fps_end;

  window.requestAnimationFrame(render);
}