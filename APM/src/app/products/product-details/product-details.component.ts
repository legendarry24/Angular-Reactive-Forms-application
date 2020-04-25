import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataService } from '../product-data.service';
import { NotificationService } from '../../notification.service';

@Component({
	templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
	pageTitle: string = 'Product Details';
	product: IProduct | undefined;
	errorMessage: string;

	constructor(private _route: ActivatedRoute,
				private _router: Router,
				private _productDataService: ProductDataService,
				private _notification: NotificationService) { }

	ngOnInit() {
		const param: string = this._route.snapshot.paramMap.get('id');
		if (param) {
			// "+" is a shortcut to convert string to int
			const id: number = +param;
			this.pageTitle += `: id=${id}`;
			this.setProduct(id);
		}
	}

	onBack(): void {
		this._router.navigate(['/products']);
	}

	onRatingClicked(message: string): void {
		this._notification.info(message);
	}

	private setProduct(id: number) {
		this._productDataService.getProduct(id)
			.subscribe({
				next: product => this.product = product,
				error: err => this.errorMessage = err
			});
	}
}
