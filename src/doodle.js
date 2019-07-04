/********** CONSTANTS **********/
const LINE_WIDTH = 1; // pixels
const CELL_SIZE = 20; // pixels
const POP_SIZE = 1000; // individuals in population
let MUTATION_RATE = 0.5; // probability
const MAX_SAME_RECORD = 1000; // generations

/********** VARIABLES **********/ 
// User drawing action
let isDrawing = false;

// Drawing
let ableToDraw = true;
let numCells;
let numRows;
let numCols;

// Evolution process flag
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
	beginEvolutionButton.disabled = true;

	// If the button is pressed, evolution begins and doodle can't be erased.
	evolving = true;
	ableToDraw = false;
	if (eraseDoodleButton) {
		eraseDoodleButton.disabled = true;
	}

	// Start the evolution process.
	startEvolution(POP_SIZE, numRows, numCols);
}

function showInfo() {
	var info = ("Population size: " + POP_SIZE + "\nCell size: " + CELL_SIZE + 
		"\nMutation rate per cell: " + (MUTATION_RATE * MUTATION_RATE).toFixed(2) +
		"\nStop: same record after " + MAX_SAME_RECORD + " generations.")


	document.getElementById("info").innerText = info;

}

// Clears the drawn doodle from user canvas.
function buttonEraseDoodle() {
	// If evolution is not in motion, we can erase our doodle.
	if (!evolving) {
		userContext.fillStyle = "#fff";
		userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);
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
			var rowIndex = Math.floor(e.clientY / (CELL_SIZE));
			var colIndex = Math.floor(e.clientX / (CELL_SIZE));

			cellY = rowIndex * CELL_SIZE;
			cellX = colIndex * CELL_SIZE;
			userContext.strokeStyle = "#fff";
			userContext.fillStyle = "#000";
			userContext.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

			// Save cell as a 1 in doodle array
			if (doodle[rowIndex][colIndex] !== 1) {
				doodle[rowIndex][colIndex] = 1;
			}			
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

	userContext.fillStyle = "#fff";
	userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);

	evoContext.fillStyle = "#fff";
	evoContext.fillRect(0, 0, evoCanvas.width, evoCanvas.height);

	// Show information regarding chosen evolution parameters
	showInfo();
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
	//ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // add opacity
	ctx.strokeStyle = "#fff";
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
