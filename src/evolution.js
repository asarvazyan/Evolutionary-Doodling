/*********** VARIABLES RELATED TO EVOLUTION **********/
let population;
let fitness;
let fitnessSum;
let maxFitness;
let recordFitness;
let record;
let numOfSameRecord;
let newRecordFound;
let generation;
let recordGeneration;
let similarity;

function startEvolution(popSize, rows, cols, numOfOnes) {
	// Creation of initial random population.
	population = new Population(popSize, rows, cols);

	// Evaluation of fitness of population.
	[fitness, fitnessSum] = population.evaluate(numOfOnes);

	// Maximum possible fitness: all cells equal.
	maxFitness = rows * cols;

	// record fitness and individual
	recordFitness = 0;
	record = population.individuals[0];
	newRecordFound = false;

	// Count of generations
	generation = 1;
	recordGeneration = 1;

	// control
	numOfSameRecord = 0;

	evolve();
}

function evolve() {
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

		document.getElementById("similarity").innerText = "Similarity: " + similarity + " %";
		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum, MUTATION_RATE);
		generation++;

		// Evaluation of fitness of new population.
		[fitness, fitnessSum] = population.evaluate(numOfOnes);

		// Stop evolution if there are no advancements.
		if (numOfSameRecord > MAX_SAME_RECORD) {
			return;
		}

		newRecordFound = false;

		// Animate!
		drawEvolved(record.genes);
		requestAnimationFrame(evolve);
	}
}

// Draws the individual with the given genes on the evolution canvas.
// Also gets similarity percentage (since it's convenient to calculate
// this in the following function).
function drawEvolved(genes) {
	drawCells(evoContext);
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

	similarity = same / maxFitness * 100;
}

// Returns a random integer given a maximum value
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}