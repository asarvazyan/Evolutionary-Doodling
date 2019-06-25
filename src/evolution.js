function beginEvolution(popSize, rows, cols) {
	// Creation of initial random populatio
	var population = new Population(popSize, rows, cols);

	// Evaluation of fitness of population
	//var fitness = population.calcFitness();
	// Creation of a mating pool given the population

	// Selection of two individuals within the mating pool

	// Crossing-over of DNA of selected individuals

	// Mutation of DNA of the child resulting from crossing-over.
}

function Population(popSize, rows, cols) {
	this.popSize = popSize;
	this.individuals = [];

	for (var i = 0; i < this.popSize; i++) {
		// Each population member's DNA is going to be a
		// 2 dimensional array of size (numRows x numCols)
		// where each element is either a 1 or 0.
		this.individuals.push(new Individual(rows, cols));	
	}

	/*this.calcFitness = function() {
		// For every individual
		for (var indiv = 0; indiv < popSize; indiv++) {
			// Fitness will be calculated as:
			// +1 if an element of the DNA of the individual
			// is the same as the cell of the user's doodle
			// and +0 otherwise.
		}
	};*/
}

function Individual(rows, cols) {
	this.DNA = [];
	this.numRows = rows;
	this.numCols = cols;

	// Create initial random DNA
	for (var i = 0; i < this.numRows; i++) {
		this.DNA.push(new Array(this.numCols).fill(0));

		for (var j = 0; j < this.numCols; j++) {
			if (Math.random(1) > 0.5) {
				this.DNA[i][j] = 1;
			}
		}
	}
}