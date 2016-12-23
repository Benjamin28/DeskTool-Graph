var c = document.getElementById("myCanvas");
var gl = c.getContext("experimental-webgl");

gl.clearColor(0.9, 0.9, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

var verticies = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];

var vertex_buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); //binding

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbinding


//set up shaders

var vertCode =
    'attribute vec2 coordinates;' +
    'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);


var fragCode = 'void main(void){' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

//now both shaders are compiled

var shaderProgram = gl.createProgram();

gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);

gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);

//associate shader programs w/ buffer objects

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
