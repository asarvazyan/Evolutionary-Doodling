class Population {
	constructor(popSize, rows, cols, mutationRate) {
		this.popSize = popSize;
		this.mutationRate = mutationRate;
		this.individuals = [];

		// Creates a random Population of size 'popSize'
		for (var i = 0; i < this.popSize; i++) {
			// Each population member's genes are going to be a
			// 2 dimensional array of size (numRows x numCols)
			// where each element is either a 1 or 0.
			var indiv = new Individual(rows, cols);
			this.individuals.push(indiv);	
		}
	}
	// Returns the fitness of the population as an array
	// where each element is the fitness of the respective
	// index's individual and the sum of fitnesses
	evaluate() {
		var fitnessArray = [];
		var fitnessSum = 0;

		// Calculate fitness of individuals
		this.individuals.forEach(ind => {
			var currFitness = ind.evaluate();
			fitnessArray.push(currFitness);
			fitnessSum += currFitness;
		});

		return [fitnessArray, fitnessSum];
	}

	// Carries out the operation of evolution (selection of parents,
	// crossing-over to get child, and child mutation), updating the
	// population based on the current one.
	evolve(fitness, fitnessSum) {
		var newIndividuals = [];

		for (var i = 0; i < this.popSize; i++) {
			// Selection of two individuals within the mating pool
			var parentA = this.select(fitness, fitnessSum);
			var parentB = this.select(fitness, fitnessSum);

			// TODO: make sure parentA !== parentB
			// Get child by crossing-over the genes of the selected individuals
			var child = parentA.crossover(parentB);

			// Mutation of genes of the child resulting from crossing-over.
			child.mutate(this.mutationRate);

			newIndividuals[i] = child;
		}

		this.individuals = newIndividuals;
	}

	// Returns an individual given a fitness array, where each element is 
	// the fitness value of the respective index's individual in the 
	// population array, and the sum of the values in the array.
	select(fitness, sum) {
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
	}
}
