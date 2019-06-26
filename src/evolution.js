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
	

	var numOfSameRecord = 0; // control
	// Until system has evolved and draws user's doodle perfectly.
	while (recordFitness < maxFitness) {
		// Display individual with highest fitness score.
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
		
		drawEvolved(record.genes);
		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum, mutationRate);

		// Evaluation of fitness.
		[fitness, fitnessSum] = population.evaluate(numOfOnes);

		console.log("Record:" + recordFitness);

		// Stop evolution if there are no advancements.
		if (numOfSameRecord > 1000) {
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

// Creates an Individual 
function Individual(rows, cols) {
	this.genes = [];
	this.numRows = rows;
	this.numCols = cols;

	// Creates initial random genes
	for (var i = 0; i < this.numRows; i++) {
		this.genes.push(new Array(this.numCols).fill(0));
	}

	for (var i = 0; i < this.numRows; i++) {
		for (var j = 0; j < this.numCols; j++) {
			if (Math.random() > 0.5) {
				this.genes[i][j] = 1;
			}
		}
	}

	// Returns a new individual with the genes of 'this'
	// crossed over with the ones from 'other'.
	this.crossover = function(other) {
		var childGenes = [];
		// Method: 
		// For each row of the genes matrix, we take a random
		// part from the genes of 'this' and the rest from the 
		// genes of 'other' to construct the genes matrix of
		// the child.
		// TODO: add option to start new row with 'this' or with
		// 'other' (now it always begins with the genes of 'this').
		for (var row = 0; row < this.numRows; row++) {
			var chooser = getRandomInt(this.numRows);
			var newRow = [];

			// Construct new row based on random number.
			// Add first 'chooser' elements of 'this'' ith row's genes.
			var thisGenes = this.genes[row].slice(0, chooser);

			// Add 'numCols - chooser' elements of 'other's' ith row's genes.
			var otherGenes = other.genes[row].slice(chooser);

			// Concatenate randomly taken parts!
			newRow = thisGenes.concat(otherGenes);

			childGenes.push(newRow);
		}

		var child = new Individual(this.numRows, this.numCols);
		child.setGenes(childGenes);

		return child;
	};

	// Returns the fitness of this individual
	this.evaluate = function(numOfOnesInDoodle) {
		var fitness = 0;
		var onesInGene = 0;

		for (var row = 0; row < this.numRows; row++) {
			for (var col = 0; col < this.numCols; col++) {
				// Fitness will be calculated as:
				// +1 if an element of the genes of the individual
				// is the same as the cell of the user's doodle
				// and +0 otherwise.
				if (this.genes[row][col] === doodle[row][col]) {
					fitness++;
				}
				if (this.genes[row][col] === 1) {
					onesInGene++;
				}
			}
		}

		var diffOnes = numOfOnesInDoodle - onesInGene;
		fitness -= Math.abs(diffOnes);

		// Minimum fitness is 1.
		return (fitness > 1 ? fitness : 1);
	};

	// Mutates genes given a mutation rate
	this.mutate = function(mutationRate) {
		this.genes.forEach(row => {
			row.forEach(cell => {
				if (Math.random() < mutationRate) {
					cell = Math.abs(cell - 1);
				}
			});
		});
	}

	this.setGenes = function(newGenes) {
		this.genes = newGenes;
	}
}

function Population(popSize, rows, cols) {
	this.popSize = popSize;
	this.individuals = [];

	// Creates a random Population of size 'popSize'
	for (var i = 0; i < this.popSize; i++) {
		// Each population member's genes are going to be a
		// 2 dimensional array of size (numRows x numCols)
		// where each element is either a 1 or 0.
		var indiv = new Individual(rows, cols);
		this.individuals.push(indiv);	
	}

	// Returns the fitness of the population as an array
	// where each element is the fitness of the respective
	// index's individual and the sum of fitnesses
	this.evaluate = function(numOfOnes) {
		var fitnessArray = [];
		var fitnessSum = 0;

		// Calculate fitness of individuals
		this.individuals.forEach(ind => {
			var currFitness = ind.evaluate(numOfOnes);
			fitnessArray.push(currFitness);
			fitnessSum += currFitness;
		});

		return [fitnessArray, fitnessSum];
	};

	// Carries out the operation of evolution (selection of parents,
	// crossing-over to get child, and child mutation), updating the
	// population based on the current one.
	this.evolve = function(fitness, fitnessSum, mutationRate) {
		var newIndividuals = [];

		for (var i = 0; i < this.popSize; i++) {
			// Selection of two individuals within the mating pool
			var parentA = this.select(fitness, fitnessSum);
			var parentB = this.select(fitness, fitnessSum);

			// TODO: make sure parentA !== parentB
			// Get child by crossing-over the genes of the selected individuals
			var child = parentA.crossover(parentB);

			// Mutation of genes of the child resulting from crossing-over.
			child.mutate(mutationRate);

			newIndividuals[i] = child;
		}

		this.individuals = newIndividuals;
	};

	// Returns an individual given a fitness array, where each element is 
	// the fitness value of the respective index's individual in the 
	// population array, and the sum of the values in the array.
	this.select = function(fitness, sum) {
		// Get a random number from 0 to sum and subtract
		// fitness values from it until it becomes
		// less than (or equal to) zero. 
		// The individual associated with the last subtracted
		// fitness score will be the one selected.
		// Method: https://github.com/CodingTrain/Rainbow-Topics/issues/146
		var chooser = getRandomInt(sum);

		for (var i = 0; chooser > 0 && i < fitness.length; i++) {
			chooser -= fitness[i];
		}
		// Go back to last subtracted value.
		if (i !== 0) {
			i--;
		}

		return this.individuals[i];
	};
}
