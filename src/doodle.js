/********** CONSTANTS **********/
const LINE_WIDTH = 1; // pixels
const CELL_SIZE = 20; // pixels

/********** VARIABLES **********/ 
// User drawing action
let isDrawing = false;
let firstTimeDrawing = true;

// Drawing
let ableToDraw = true;
let numCells;
let numRows;
let numCols;

// Evolution process
let evolving = false;
let mutationRate = document.getElementById("mutRate").value; 
let popSize = document.getElementById("popSize").value; 
let maxSameRecord = document.getElementById("stopAt").value;

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
	clear(evoCanvas, evoContext);

	// Get input parameters
	mutationRate = document.getElementById("mutRate").value;
	popSize = document.getElementById("popSize").value;
	maxSameRecord = document.getElementById("stopAt").value;

	// Start the evolution process if input values are correct
	if (correctInput(mutationRate, popSize, maxSameRecord)) {

		beginEvolutionButton.disabled = true;

		// If the button is pressed, evolution begins and doodle can't be erased.
		evolving = true;
		ableToDraw = false;
		if (eraseDoodleButton) {
			eraseDoodleButton.disabled = true;
		}

		showInfo();
		startEvolution(popSize, numRows, numCols, mutationRate, maxSameRecord);
	}
	else {
		evoContext.font = "18px Times";
		evoContext.fillStyle = "#000";
		evoContext.textAlign = "center";
		evoContext.fillText("One or more of the input values are incorrect.", evoCanvas.width/2, evoCanvas.height/2); 
	}
}

function showInfo() {
	var info = ("Population size: " + popSize + "\nCell side size: " + CELL_SIZE + 
		"px\nMutation rate per cell: " + mutationRate +
		"\nStop after " + maxSameRecord + " generations of no new record.")


	document.getElementById("info").innerText = info;
}

function correctInput(mr, ps, msr) {
	// ensure input values are within range and mutliples of correct number.
	return ((mr >= 0 && mr <= 1) && 
			(ps % 100 === 0 && ps >= 100 && ps <= 10000) &&
			(msr % 10 === 0 && msr >= 250 && msr <= 2000));
}

// Clears the drawn doodle from user canvas.
function buttonEraseDoodle() {
	// If evolution is not in motion, we can erase our doodle.
	if (!evolving) {
		clear(userCanvas, userContext);
	}
}

// Sets up the user and evolution canvas
function canvasSetup() {
	// User doodle drawing canvas
	userCanvas = document.getElementById("userCanvas");
	userContext = userCanvas.getContext("2d");

	// When user clicks on a cell, they start drawing
	userCanvas.addEventListener("mousedown", e => {
		if (firstTimeDrawing === true) {
			clear(userCanvas, userContext);
			firstTimeDrawing = false;
		}	
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

	// Canvas must be cleared.
	clear(userCanvas, userContext);
	clear(evoCanvas, evoContext);

	// Show instructional text
	userContext.font = "35px Times";
	userContext.fillStyle = "#000";
	userContext.textAlign = "center";
	userContext.fillText("Draw here!", userCanvas.width/2, userCanvas.height/2);

	evoContext.font = "35px Times";
	evoContext.fillStyle = "#000";
	evoContext.textAlign = "center";
	evoContext.fillText("Evolution is shown here!", evoCanvas.width/2, evoCanvas.height/2); 

	// Show information regarding evolution
	showInfo();
}

// Creates the doodle array filling it with 0.
function doodleSetup() {
	for (var row = 0; row < numRows; row++) {
		doodle.push(new Array(numCols).fill(0));
	}
}

function clear(canvas, ctx) {
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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
