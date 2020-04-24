import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import { IProduct } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly _productsFromJsonUrl = 'api/products/products.json';
	private readonly _productsUrl = 'api/products';

	constructor(private _httpClient: HttpClient) { }

	getProducts(): Observable<IProduct[]> {
		return this._httpClient.get<IProduct[]>(this._productsUrl)
			.pipe(
				tap(data => console.log(JSON.stringify(data))),
				catchError(this.handleError)
			);
	}

	getProduct(id: number): Observable<IProduct> {
		if (id === 0) {
			return of(this.initializeProduct());
		}

		const url: string = `${this._productsUrl}/${id}`;
		return this._httpClient.get<IProduct>(url)
			.pipe(
				tap(data => console.log('getProduct: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
	}

	getProductsFromJsonFile(): Observable<IProduct[]> {
		return this._httpClient.get<IProduct[]>(this._productsFromJsonUrl)
			.pipe(
				tap(data => console.log('All: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
	}

	getProductFromJsonFile(id: number): Observable<IProduct> {
		return this.getProductsFromJsonFile()
			.pipe(
				map((products: IProduct[]) => products.find(p => p.id === id))
			);
	}

	createProduct(product: IProduct): Observable<IProduct> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// It is needed for InMemoryWebApi POST method to generate ID on the server side
		product.id = null;

		return this._httpClient.post<IProduct>(this._productsUrl, product, { headers })
			.pipe(
				tap(data => console.log('createProduct: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
	}

	updateProduct(product: IProduct): Observable<IProduct> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const url: string = `${this._productsUrl}/${product.id}`;

		return this._httpClient.put<IProduct>(url, product, { headers })
			.pipe(
				tap(() => console.log('updateProduct: ' + product.id)),
				// Return the product on an update. It is needed because
				// PUT method of InMemoryWebApi doesn't return updated object in the response
				map(() => product),
				catchError(this.handleError)
			);
	}

	deleteProduct(id: number): Observable<{}> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const url = `${this._productsUrl}/${id}`;

		return this._httpClient.delete<IProduct>(url, { headers })
			.pipe(
				tap(() => console.log('deleteProduct: ' + id)),
				catchError(this.handleError)
			);
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage: string;
		if (err.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			errorMessage = `Backend server returned code: ${err.status}, error message is: ${err.message}`;
		}

		console.error(errorMessage);
		return throwError(errorMessage);
	}

	private initializeProduct(): IProduct {
		// Return an initialized object
		return {
			id: 0,
			productName: null,
			productCode: null,
			tags: [''],
			releaseDate: formatDate(Date.now(), 'MMMM d, y', 'en'),
			price: null,
			description: null,
			starRating: null,
			imageUrl: null
		};
	}
}
