import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'lib-my-logger',
	template: `
		<p>
			my-logger works!
		</p>
	`,
	styles: [
	]
})
export class MyLoggerComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
