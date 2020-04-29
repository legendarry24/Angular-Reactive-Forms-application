import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MyLoggerService {
	log(message: string) {
		console.log(message);
	}
}
