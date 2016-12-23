var c = document.getElementById("myCanvas");
var gl = c.getContext("experimental-webgl");

gl.clearColor(0.9, 0.9, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

var verticies = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];

var vertex_buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);
