function beginEvolution(popSize, rows, cols) {
	// Creation of initial random populatio
	var population = new Population(popSize, rows, cols);

	// Evaluation of fitness of population
	var fitness = population.calcFitness();
	
	// Creation of a mating pool given the population

	// Selection of two individuals within the mating pool

	// Crossing-over of DNA of selected individuals

	// Mutation of DNA of the child resulting from crossing-over.
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
	// index's individual.
	this.calcFitness = function() {
		var fitnessArray = [];
		// For every individual
		for (var i = 0; i < this.popSize; i++) {
			fitnessArray.push(this.individuals[i].calcFitness());
		}

		return fitnessArray;
	};
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
	this.calcFitness = function() {
		var fitness = 0;

		for (var row = 0; row < this.numRows; row++) {
			for (var col = 0; col < this.numCols; col++ ) {
				// Fitness will be calculated as:
				// +1 if an element of the DNA of the individual
				// is the same as the cell of the user's doodle
				// and +0 otherwise.
				if (this.DNA[row][col] == doodle[row][col]) {
					fitness++;
				}
			}
		}
	}
}