import { Component, OnInit } from '@angular/core';
import { MyLoggerService } from 'my-logger';

@Component({
	selector: 'pm-root',
	template: `
		<nav class='navbar navbar-expand navbar-light bg-light'>
			<a class='navbar-brand'>{{ pageTitle }}</a>
			<ul class="nav nav-pills">
				<li class='nav-item'>
					<a class='nav-link'
					   routerLinkActive='active'
					   [routerLink]="['/welcome']">
						Home
					</a>
				</li>
				<li class='nav-item'>
					<a class='nav-link'
					   routerLinkActive='active'
					   [routerLinkActiveOptions]="{exact: true}"
					   [routerLink]="'/products'">
						Product List
					</a>
				</li>
				<li class='nav-item'>
					<a class='nav-link'
					   routerLinkActive='active'
					   [routerLinkActiveOptions]="{exact: true}"
					   [routerLink]="['/products/0/edit']">
						Add Product
					</a>
				</li>
			</ul>
		</nav>
		<div class='container'>
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	pageTitle: string = 'Acme Product Management';

	constructor(private logger: MyLoggerService) {}

	ngOnInit(): void {
		this.logger.log(`Application started at ${new Date().toLocaleString()}`);
	}
}
