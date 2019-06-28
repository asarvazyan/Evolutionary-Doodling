/*********** VARIABLES RELATED TO EVOLUTION **********/
let population;
let fitness;
let fitnessSum;
let maxFitness;
let recordFitness;
let record;
let numOfSameRecord;
let newRecordFound;

function beginEvolution(popSize, rows, cols, numOfOnes) {
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
			
		

		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum, MUTATION_RATE);

		// Evaluation of fitness of new population.
		[fitness, fitnessSum] = population.evaluate(numOfOnes);

		console.log("Record:" + recordFitness);

		// Stop evolution if there are no advancements.
		if (numOfSameRecord > MAX_SAME_RECORD) {
			return;
		}

		newRecordFound = false;

		// Something's not working here...
		// TODO: make it so the record is drawn every time a new record is found.
		// TODO: have the correct cells be drawn in green and the incorrect ones in red.
		drawEvolved(record.genes);
		requestAnimationFrame(evolve);
	}
}

// Draws the individual with the given genes on the evolution canvas.
function drawEvolved(genes) {
	drawCells(evoContext);
	evoContext.fillStyle = "#000";

	for (var row = 0; row < genes.length; row++) {
		for (var col = 0; col < genes[row].length; col++) {
			if (genes[row][col] === 1) {
				cellX = col * CELL_SIZE;
				cellY = row * CELL_SIZE;

				evoContext.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);
			}
		}
	}
}

// Returns a random integer given a maximum value
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}