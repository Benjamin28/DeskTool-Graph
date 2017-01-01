

function graph_draw(gl, canvas, domain, range){

    console.log("in graph_draw");
    
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    
    var vertices = [-0.1, 0.1, -0.1, -0.1, 0.1, -0.1,];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    var vertCode =
	'attribute vec2 coordinates;' + 
	'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.9 );' + '}';
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);
    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertShader); 
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);


    gl.clearColor(0.0, 0.0, 0.0, 0.1);
    gl.enable(gl.DEPTH_TEST); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    /*
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    vertices = [-0.1, 0.1, 0.1, 0.1, 0.1, -0.1,];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


    vertices = [-0.1, 0.1, 0.8, 0.1, 0.1, -0.1,];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);*/


//    graph_triangle(vertex_buffer, gl, canvas);
    graph_plot_points(vertex_buffer, gl, canvas, domain, range);
    
}

function graph_triangle(vertex_buffer, gl, canvas){

    vertices = [-0.5, 0.5, 0.5, 0.5, 0.5, -0.5,];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


}

function graph_plot_points(vertex_buffer, gl, canvas, domain, range){

    var x_max = domain[domain.length-1];
    var x_min = domain[0];

    console.log(x_max);

    var y_max = Math.max.apply(null, range);

    if(y_max == 0)
	y_max = 1;

    console.log(domain.length);
    
    for(var i = 0; i < domain.length; i++){

	var x = domain[i] / x_max;
	var y = range[i] / y_max;

	console.log(x, y);

	var vertices = [x-0.01, y+0.01, x+0.01, y+0.01, x+0.01, y-0.01,]
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null)
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	var vertices = [x-0.01, y+0.01, x-0.01, y-0.01, x+0.01, y-0.01,]
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null)
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	
    }

}
