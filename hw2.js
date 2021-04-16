var canvas;
var gl;
var program;
var vertices;
var xrSlider = 0.2;
var xrSliderLoc;
var yrSlider = 0.1;
var yrSliderLoc;
var theta = 10;
var redSlider = 1.0;
var redSliderLoc;
var greenSlider = 0.0;
var greenSliderLoc;
var blueSlider = 0.0;
var blueSliderLoc;
var posX = 0.0;
var posXLoc;
var posY = 0.0;
var posYLoc;
var scaleX = 1.0;
var scaleXLoc;
var scaleY = 1.0;
var scaleYLoc;

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	vertices = [vec2(0, 0),
				vec2(0, 1)];

	//TODO: create geometry 
    theta;
	for (i = 0; i <= (360/theta); i++){
        vertices.push(vec2(-Math.sin(i*theta* Math.PI / 180),Math.cos(i*theta* Math.PI / 180)));
    }


	//vertex buffer
	var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );  

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    xrSliderLoc = gl.getUniformLocation( program, "xrSlider" );
    yrSliderLoc = gl.getUniformLocation( program, "yrSlider" );
    redSliderLoc = gl.getUniformLocation( program, "redSlider" );
    greenSliderLoc = gl.getUniformLocation( program, "greenSlider" );
    blueSliderLoc = gl.getUniformLocation( program, "blueSlider" );
    posXLoc = gl.getUniformLocation( program, "posX" );
    posYLoc = gl.getUniformLocation( program, "posY" );
    scaleXLoc = gl.getUniformLocation( program, "scaleX" );
    scaleYLoc = gl.getUniformLocation( program, "scaleY" );


	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posX = event.target.value;
    };    
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posY = event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleX = event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleY = event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        redSlider = event.target.value;
        //init();
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        greenSlider = event.target.value;
        //init();
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blueSlider = event.target.value;
        //init();
    };
	document.getElementById("theta1").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
        theta = 1;
        init();
    };	
	document.getElementById("theta2").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
        theta = 10;
        init();

    };
	document.getElementById("theta3").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse 
        theta = 20;
        init();

    };	
	document.getElementById("theta4").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
        theta = 30;
        init();

    };	
	document.getElementById("theta5").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
        theta = 60;
        init();

    };	
	document.getElementById("xrSlider").oninput = function(event) {
        //TODO: fill here to adjust x radius of the ellipse
        xrSlider = event.target.value;
    };	
	document.getElementById("yrSlider").oninput = function(event) {
        //TODO: fill here to adjust y radius of the ellipse
        yrSlider = event.target.value;
    };	

    render();
};

function render() {
	//TODO: send necessary variables to shader, draw call, swap buffers
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1f( xrSliderLoc, xrSlider )
    gl.uniform1f( yrSliderLoc, yrSlider )
    gl.uniform1f( redSliderLoc, redSlider );
    gl.uniform1f( greenSliderLoc, greenSlider );
    gl.uniform1f( blueSliderLoc, blueSlider );
    gl.uniform1f( posXLoc, posX );
    gl.uniform1f( posYLoc, posY );
    gl.uniform1f( scaleXLoc, scaleX );
    gl.uniform1f( scaleYLoc, scaleY );	
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);
    window.requestAnimFrame(render);
}
