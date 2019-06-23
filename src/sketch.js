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

canvasSetup();