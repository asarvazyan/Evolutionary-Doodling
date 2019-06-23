/********** CONSTANTS **********/
const LINE_WIDTH = 4; // pixels

/********** VARIABLES **********/
// Flags 
// User drawing action
let isDrawing = false;
// Drawing ability
let ableToDraw = true;

// Evolution process
let evolving = false;

// Mouse posiiton
let mouseX;
let mouseY;

// User Canvas
let userCanvas;
let userContext;

// Evoultion Canvas
let evoCanvas;
let evoContext;

// Buttons
let beginEvolutionButton = document.getElementById("beginEvolutionButton");;
let eraseDoodleButton = document.getElementById("eraseDoodleButton");

/********** FUNCTIONS **********/
// Begins evolution on button press event.
function beginEvolution() {
	// temporary: button only shows text on evolution canvas.
	evoContext.font = "30px Times";
	evoContext.fillStyle = "#000";
	evoContext.textAlign = "center";
	evoContext.fillText("Evolution has started.", evoCanvas.width / 2, evoCanvas.height  /2); 
	beginEvolutionButton.disabled = true;

	// if the button is pressed, evolution begins and doodle can't be erased
	evolving = true;
	ableToDraw = false;
	if (eraseDoodleButton) {
		eraseDoodleButton.disabled = true;
	}
}

// Sets up the user and evolution canvas
function canvasSetup() {
	// User doodle drawing canvas
	userCanvas = document.getElementById("userCanvas");
	userContext = userCanvas.getContext("2d");
	userContext.fillStyle = "#fff";
	userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);

	// Evolution canvas
	evoCanvas = document.getElementById("evoCanvas");
	evoContext = evoCanvas.getContext("2d");
	evoContext.fillStyle = "#fff";
	evoContext.fillRect(0, 0, evoCanvas.width, evoCanvas.height);
}

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

// Clears the drawn doodle from user canvas.
function eraseDoodle() {
	// If evolution is not in motion, we can erase our doodle.
	if (!evolving) {
		userContext.fillStyle = "#fff";
		userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);
	}
}

canvasSetup();


/********** ACTIONS ON EVENTS **********/
// On mouse click, drawing action will begin
userCanvas.addEventListener("mousedown", e => {
	// Get mouse coords
	mouseX = e.clientX - userCanvas.offsetLeft;
	mouseY = e.clientY - userCanvas.offsetTop; 
	if (ableToDraw === true){
		isDrawing = true;
	}
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