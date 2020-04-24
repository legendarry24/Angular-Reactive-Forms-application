import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';

import { NotificationService } from '../../notification.service';
import { ProductService } from '../product.service';

@Component({
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	pageTitle: string = 'Product List';
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = true;
	errorMessage: string;

	products: IProduct[];
	filteredProducts: IProduct[];
	private _listFilter: string;

	constructor(private _notification: NotificationService,
				private _productService: ProductService) {
	}

	// when a data binding needs a value it will call the getter and get the value
	get listFilter(): string {
		return this._listFilter;
	}

	// everytime a user modifies the value, the data binding calls the setter passing in the changed value.
	// We can add some logic to the setter that will be performed everytime the value is changed.
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredProducts = this._listFilter ? this.performFilter() : this.products;
	}

	ngOnInit(): void {
		this._productService.getProducts()
			.subscribe({
				next: (products: IProduct[]) => {
					this.products = products;
					this.filteredProducts = this.products;
				},
				error: err => this.errorMessage = err
			});
	}

	onRatingClicked(message: string): void {
		this._notification.info(message);
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	private performFilter(): IProduct[] {
		const filterBy: string = this._listFilter.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}
}
