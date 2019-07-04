/*********** VARIABLES RELATED TO EVOLUTION **********/
let population; // the population object that evolves
let fitness = []; // the fitness values of a generation
let fitnessSum; // sum of fitness values of a generation
let maxFitness = 0;; // maximum fitness possible
let recordFitness = 0;; // best fitness in evolution process
let record; // individual with best fitness
let newRecordFound = false; // flag for found record
let numOfSameRecord = 0; // control of lack of evolution
let generation = 1; // number of generations
let recordGeneration = 1; // generation that contains record individual
let similarity = 0; // similarity between user input and record individual

function startEvolution(popSize, rows, cols, mutationRate, maxSameRecord) {

	// Creation of initial random population.
	population = new Population(popSize, rows, cols, mutationRate);

	// Evaluation of fitness of population.
	[fitness, fitnessSum] = population.evaluate();

	// Maximum possible fitness: all cells equal.
	maxFitness = rows * cols;

	evolve(maxSameRecord);
}

function evolve(maxSameRecord) {
	if (recordFitness < maxFitness) {
		// Get individual with highest fitness score.
		for (var i = 0; i < fitness.length; i++) {
			if (fitness[i] > recordFitness) {
				recordFitness = fitness[i];
				record = population.individuals[i];
				newRecordFound = true;
			}
		}

		// Count how many times the record has not changed
		// Used to terminate the program in case the evolution 
		// result is not perfect.
		if (newRecordFound === false) {
			numOfSameRecord++;
		}
		else {
			numOfSameRecord = 0;
		}

		document.getElementById("genCount").innerText = "Generation: " + generation;

		if (newRecordFound === true) {
			recordGeneration = generation;
			document.getElementById("recordGen").innerText = "Record Generation: " + recordGeneration;
		}

		document.getElementById("similarity").innerText = "Similarity: " + similarity.toFixed(2) + " %";
		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum);
		//MUTATION_RATE += 0.00001;
		//showInfo();
		generation++;

		// Evaluation of fitness of new population.
		[fitness, fitnessSum] = population.evaluate();

		// Stop evolution if there are no advancements.
		if (numOfSameRecord > maxSameRecord) {
			evolving = false;
			return;
		}

		newRecordFound = false;

		// Animate!
		drawEvolved(record.genes);
		requestAnimationFrame(evolve);
	}
	else {
		evolving = false;
	}
}

// Draws the individual with the given genes on the evolution canvas.
// Also gets similarity percentage (since it's convenient to calculate
// this in the following function).
function drawEvolved(genes) {
	// Clear canvas
	evoContext.fillStyle = "#fff";
	evoContext.fillRect(0, 0, evoCanvas.width, evoCanvas.height);

	// Draw 
	evoContext.fillStyle = "#000";
	let same = 0;
	for (var row = 0; row < genes.length; row++) {
		for (var col = 0; col < genes[row].length; col++) {
			// Only draw cells that are black (1 on genes matrix)
			if (genes[row][col] === 1) {
				cellX = col * CELL_SIZE;
				cellY = row * CELL_SIZE;

				evoContext.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);
			}

			// Similarity calculation:
			if (genes[row][col] === doodle[row][col]) {
				same++;
			}
		}
	}

	// Percentage!
	similarity = same / maxFitness * 100;
}

// Returns a random integer given a maximum value
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}