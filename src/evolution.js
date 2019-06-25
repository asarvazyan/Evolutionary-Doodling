function beginEvolution(popSize, rows, cols) {
	// Creation of initial random population.
	var population = new Population(popSize, rows, cols);

	// Evaluation of fitness of population.
	var [fitness, fitnessSum] = population.evaluate();

	// Maximum possible fitness: all cells equal.
	var maxFitness = rows * cols;

	// Until system has evolved and draws user's doodle perfectly.
	while (fitness < maxFitness) {
		// Create new population based on current one. 
		population.evolve(fitness, fitnessSum);

		// Evaluation of fitness.
		[fitness, fitnessSum] = population.evaluate();
	}		
}

function Population(popSize, rows, cols) {
	this.popSize = popSize;
	this.individuals = [];

	// Creates a random Population of size 'popSize'
	for (var i = 0; i < this.popSize; i++) {
		// Each population member's DNA is going to be a
		// 2 dimensional array of size (numRows x numCols)
		// where each element is either a 1 or 0.
		this.individuals.push(new Individual(rows, cols));	
	}

	// Returns the fitness of the population as an array
	// where each element is the fitness of the respective
	// index's individual and the sum of fitnesses
	// TODO: take into account the number of white and black cells in doodle
	// and how many of each are contained in each individual's DNA.
	this.evaluate = function() {
		var fitnessArray = [];
		var fitnessSum = 0;

		// Calculate fitness of individuals
		for (var i = 0; i < this.popSize; i++) {
			fitnessArray.push(this.individuals[i].evaluate());
			// For mating pool construction
			fitnessSum += fitnessArray[i];
		}

		return [fitnessArray,fitnessSum];
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
		var chooser = random(sum);

		for (var i = 0; chooser > 0; i++) {
			chooser -= fitness[i];
		}
		// Go back to last subtracted value.
		i--;

		return this.individuals[i];
	};

	this.evolve = function(fitness, sum) {
		var newPop = [];
		for (var i = 0; i < this.popSize; i++) {
			// Selection of two individuals within the mating pool
			var parentA = this.select(fitness, sum);
			var parentB = this.select(fitness, sum);

			// TODO: make sure parentA !== parentB
			// Crossing-over of DNA of selected individuals


			// Mutation of DNA of the child resulting from crossing-over. 
		}
	}
}

// Creates an Individual 
function Individual(rows, cols) {
	this.DNA = [];
	this.numRows = rows;
	this.numCols = cols;

	// Creates initial random DNA
	for (var i = 0; i < this.numRows; i++) {
		this.DNA.push(new Array(this.numCols).fill(0));

		for (var j = 0; j < this.numCols; j++) {
			if (Math.random(1) > 0.5) {
				this.DNA[i][j] = 1;
			}
		}
	}

	// Returns the fitness of this individual
	this.evaluate = function() {
		var fitness = 0;

		for (var row = 0; row < this.numRows; row++) {
			for (var col = 0; col < this.numCols; col++ ) {
				// Fitness will be calculated as:
				// +1 if an element of the DNA of the individual
				// is the same as the cell of the user's doodle
				// and +0 otherwise.
				if (this.DNA[row][col] === doodle[row][col]) {
					fitness++;
				}
			}
		}

		return fitness;
	};
}