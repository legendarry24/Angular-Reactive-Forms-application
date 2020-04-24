export class LevenshteinDistance {
	// Calculate the levenshtein distance of two strings.
	// See https://en.wikipedia.org/wiki/Levenshtein_distance.
	// Returns a number that represents the distance between the two strings.
	// The greater the number the more distant the strings are from each others.
	static calculate(first: string, second: string): number {
		if (first.length === 0) {
			return second.length;
		}
		if (second.length === 0) {
			return first.length;
		}

		const matrix = [];

		// increment along the first column of each row
		for (let i = 0; i <= first.length; i++) {
			matrix[i] = [i];
		}

		// increment each column in the first row
		for (let j = 0; j <= second.length; j++) {
			matrix[0][j] = j;
		}

		for (let n = 1; n <= first.length; n++) {
			for (let m = 1; m <= second.length; m++) {
				matrix[n][m] = Math.min(
					// substitution
					matrix[n - 1][m - 1] + LevenshteinDistance.substitutionCost(
						first[n - 1], second[m - 1]),
					// insertion
					matrix[n][m - 1] + 1,
					// deletion
					matrix[n - 1][m] + 1,
				);
			}
		}

		// the last cell in the matrix will be the Levenshtein distance between strings
		return matrix[first.length][second.length];
	}

	private static substitutionCost(firstChar: string, secondChar: string): number {
		// if characters match there is no need to perform the substitution
		return firstChar === secondChar ? 0 : 1;
	}
}
