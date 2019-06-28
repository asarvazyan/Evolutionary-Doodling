// Takes care of every evolution step on a population.
function beginEvolution(popSize, rows, cols, mutationRate, numOfOnes) {
	// Creation of initial random population.
	var population = new Population(popSize, rows, cols);

	// Evaluation of fitness of population.
	var [fitness, fitnessSum] = population.evaluate(numOfOnes);

	// Maximum possible fitness: all cells equal.
	var maxFitness = rows * cols;

	// record fitness and individual
	var recordFitness = 0;
	var record = population.individuals[0];
	var newRecordFound = false;

	// control
	var numOfSameRecord = 0;

	// Until system has evolved and draws user's doodle perfectly.
	while (recordFitness < maxFitness) {

		// Get individual with highest fitness score.
		for (var i = 0; i < fitness.length; i++) {
			if (fitness[i] > recordFitness) {
				recordFitness = fitness[i];
				record = population.individuals[i];
				newRecordFound = true;
			}
		}

		if (newRecordFound === false) {
			numOfSameRecord++;
		}
		else {
			numOfSameRecord = 0;
		}
		
		// Something's not working here...
		// TODO: make it so the record is drawn every time a new record is found.
		// TODO: have the correct cells be drawn in green and the incorrect ones in red.
		drawEvolved(record.genes);

		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum, mutationRate);

		// Evaluation of fitness of new population.
		[fitness, fitnessSum] = population.evaluate(numOfOnes);

		console.log("Record:" + recordFitness);

		// Stop evolution if there are no advancements.
		if (numOfSameRecord > MAX_SAME_RECORD) {
			return;
		}

		newRecordFound = false;
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



