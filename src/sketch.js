/********** CONSTANTS **********/
const LINE_WIDTH = 4; // pixels


/********** VARIABLES **********/
// Flag for user drawing action
var isDrawing = false;

// Mouse posiiton
var mouseX;
var mouseY;

/********** SETUP **********/
// User doodle drawing canvas
let userCanvas = document.getElementById("userCanvas");
let userContext = userCanvas.getContext("2d");
userContext.fillStyle = "#fff";
userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);

// (Evolutionary) copying canvas
let copyCanvas = document.getElementById("copyCanvas");
let copyContext = copyCanvas.getContext("2d");
copyContext.fillStyle = "#fff";
copyContext.fillRect(0, 0, copyCanvas.width, copyCanvas.height);


/********** ACTIONS ON EVENTS **********/
// On mouse click, drawing action will begin
userCanvas.addEventListener("mousedown", e => {
	// Get mouse coords
	mouseX = e.clientX - userCanvas.offsetLeft;
	mouseY = e.clientY - userCanvas.offsetTop; 

	isDrawing = true;

});

// On mouse movement, drawing action will occur
userCanvas.addEventListener("mousemove", e => {
	if (isDrawing === true) {
		// Update mouse position
		prevX = mouseX;
		prevY = mouseY;
		mouseX = e.clientX - userCanvas.offsetLeft;
		mouseY = e.clientY - userCanvas.offsetTop;

		// Draw!
		drawLine(userContext, prevX, prevY, mouseX, mouseY);
	}
});

// On mouse un-click (?), drawing action will stop.
userCanvas.addEventListener("mouseup", e => {
	if (isDrawing === true) {
		// Last mouse position update
		prevX = mouseX;
		prevY = mouseY;
		mouseX = e.clientX - userCanvas.offsetLeft;
		mouseY = e.clientY - userCanvas.offsetTop;

		// Final line drawing
		drawLine(userContext, prevX, prevY, mouseX, mouseY);
	}
	isDrawing = false;
});

/********** FUNCTIONS **********/
// Draws a line from (prevX, prevY) to (mouseX, mouseY) on canvas ctx
function drawLine(ctx, prevX, prevY, mouseX, mouseY) {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = LINE_WIDTH;
	ctx.lineTo(mouseX, mouseY);
	ctx.stroke();
	ctx.closePath();
}

// Begins evolution on button press event.
function beginEvolution() {
	var button = document.getElementById("beginEvolBtn");
	// temporary: button only shows text on evolution canvas.
	copyContext.font = "30px Times";
	copyContext.fillStyle = "#000";
	copyContext.textAlign = "center";
	copyContext.fillText("Evolution has started.", copyCanvas.width / 2, copyCanvas.height  /2); 
	button.disabled = true;
}

// Clears the drawn doodle from user canvas.
function eraseDrawingCanvas() {
	var button = document.getElementById("eraseDrawing");
	userContext.fillStyle = "#fff";
	userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);
}