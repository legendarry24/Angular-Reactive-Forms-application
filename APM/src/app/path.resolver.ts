import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { paths } from './app-paths';
import { LevenshteinDistance } from './levenshtein-distance';

@Injectable({
	providedIn: 'root'
})
export class PathResolver implements Resolve<string | null> {
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): string | null {
		const typoPath: string = state.url.replace('/', '');
		const dictionary: string[] = Object.values(paths);

		if (!dictionary.length) return null;

		this.sortByDistances(typoPath, dictionary);

		// return item with the smallest Levenshtein distance
		return `/${dictionary[0]}`;
	}

	// sort the dictionary by the Levenshtein distance to the input value
	private sortByDistances(typoPath: string, dictionary: string[]) {
		const pathsDistance = {} as { [name: string]: number };

		dictionary.sort((a, b) => {
			if (!(a in pathsDistance)) {
				pathsDistance[a] = LevenshteinDistance.calculate(a, typoPath);
			}
			if (!(b in pathsDistance)) {
				pathsDistance[b] = LevenshteinDistance.calculate(b, typoPath);
			}

			return pathsDistance[a] - pathsDistance[b];
		});
	}
}
