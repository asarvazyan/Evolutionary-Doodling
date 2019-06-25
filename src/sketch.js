/********** CONSTANTS **********/
const LINE_WIDTH = 1; // pixels
const CELL_SIZE = 30; // pixels
const POP_SIZE = 10; // individuals in population


/********** VARIABLES **********/ 
// User drawing action
let isDrawing = false;

// Drawing
let ableToDraw = true;
let numCells;
let numRows;
let numCols;

// Evolution process
let evolving = false;

// Doodle array (one => black pixel, zero => white pixel)
let doodle = [];
 
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
function buttonBeginEvolution() {
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

	// start the evolution process
	beginEvolution(POP_SIZE, numRows, numCols);
}

// Clears the drawn doodle from user canvas.
function buttonEraseDoodle() {
	// If evolution is not in motion, we can erase our doodle.
	if (!evolving) {
		drawCells(userContext);
	}
}

// Sets up the user and evolution canvas
function canvasSetup() {
	// User doodle drawing canvas
	userCanvas = document.getElementById("userCanvas");
	userContext = userCanvas.getContext("2d");

	// When user clicks on a cell, they start drawing
	userCanvas.addEventListener("mousedown", e => {
		// Can only start drawing if evolution has not begun
		if (!evolving) {
			isDrawing = true;	
		}	
	});

	// When user moves mouse and has clicked, cell turns black.
	userCanvas.addEventListener("mousemove", e => {
		if (isDrawing === true) {
			// fill black cell

			var rowIndex = Math.floor(e.clientY / (CELL_SIZE + 1));
			var colIndex = Math.floor(e.clientX / (CELL_SIZE + 1));

			cellY = rowIndex * CELL_SIZE;
			cellX = colIndex * CELL_SIZE;
			userContext.fillStyle = "#000";
			userContext.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

			// Save cell as a 1 in doodle array
			doodle[rowIndex][colIndex] = 1;
		}
	});

	// When user lets go of mouse, drawing stops.
	userCanvas.addEventListener("mouseup", e => {
		isDrawing = false;
	});

	// Evolution canvas
	evoCanvas = document.getElementById("evoCanvas");
	evoContext = evoCanvas.getContext("2d");

	// Drawing
	numRows = Math.floor(userCanvas.height / CELL_SIZE);
	numCols = Math.floor(userCanvas.width / CELL_SIZE);
	numCells = numRows * numCols;
	drawCells(evoContext);
	drawCells(userContext);
}

// Creates the doodle array filling it with 0.
function doodleSetup() {
	for (var row = 0; row < numRows; row++) {
		doodle.push(new Array(numCols).fill(0));
	}
}

// Draws the canvas as cells
function drawCells(ctx) {
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // add opacity
	ctx.fillStyle = "#fff";
	ctx.lineWidth = LINE_WIDTH;

	for (var row = 0; row < numRows; row++) {
		for (var column = 0; column < numCols; column++) {
			var x = column * CELL_SIZE;
			var y = row * CELL_SIZE;
			ctx.rect(x, y, CELL_SIZE, CELL_SIZE);
			ctx.fill();
			ctx.stroke();
		}
	}
	ctx.closePath();
}

canvasSetup();
doodleSetup();
