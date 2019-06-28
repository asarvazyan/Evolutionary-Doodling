// Creates an Individual 
class Individual {
	constructor(rows, cols) {
		this.numRows = rows;
		this.numCols = cols;
		this.genes = [];

		// Create initial random genes.
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
	}

	// Returns a new individual with the genes of 'this'
	// crossed over with the ones from 'other'.
	crossover(other) {
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
	}

	// Returns the fitness of this individual
	evaluate(numOfOnesInDoodle) {
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
	}

	// Mutates genes given a mutation rate
	mutate(mutationRate) {
		this.genes.forEach(row => {
			row.forEach(cell => {
				if (Math.random() < mutationRate) {
					cell = Math.abs(cell - 1);
				}
			});
		});
	}

	// Setter function for the genes attribute.
	// Intended use: creation of child genes.
	setGenes(newGenes) {
		this.genes = newGenes;
	}
}