import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge, concat } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { NotificationService } from 'src/app/notification.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';

@Component({
	templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

	pageTitle = 'Product Edit';
	errorMessage: string;
	productForm: FormGroup;

	product: IProduct;
	private subscriber: Subscription;

	// Use with the generic validation message class
	displayMessage: { [key: string]: string } = {};
	private genericValidator: GenericValidator;

	get tags(): FormArray {
		return this.productForm.get('tags') as FormArray;
	}

	constructor(private fb: FormBuilder,
				private route: ActivatedRoute,
				private router: Router,
				private productService: ProductService,
				private notification: NotificationService) {

		// Define an instance of the validator for use with this form,
		// passing in this form's set of validation messages.
		this.genericValidator = new GenericValidator(this.getValidationMessages());
	}

	ngOnInit(): void {
		this.productForm = this.fb.group({
			productName: ['', [
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(50)
				]
			],
			productCode: ['', Validators.required],
			starRating: ['', NumberValidators.range(1, 5)],
			tags: this.fb.array([]),
			description: ''
		});

		// Read the product Id from the route parameter
		this.subscriber = this.route.paramMap.subscribe(
			params => {
				const id: number = +params.get('id');
				this.getProduct(id);
			}
		);
	}

	ngOnDestroy(): void {
		this.subscriber.unsubscribe();
	}

	ngAfterViewInit(): void {
		// Watch for the blur event (occurs when an element loses focus)
		// from any input element on the form.
		// This is required because the valueChanges does not provide notification on blur
		const controlBlurs: Observable<any>[] = this.formInputElements
			.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

		// Merge the blur event observable with the valueChanges observable
		// so we only need to subscribe once.
		merge(this.productForm.valueChanges, ...controlBlurs)
			.pipe(
				debounceTime(400)
			)
			.subscribe(value => {
				this.displayMessage = this.genericValidator.processMessages(this.productForm);
			});
	}

	addTag(): void {
		this.tags.push(new FormControl());
	}

	deleteTag(index: number): void {
		this.tags.removeAt(index);
		this.tags.markAsDirty();
	}

	getProduct(id: number): void {
		this.productService.getProduct(id)
			.subscribe({
				next: (product: IProduct) => this.displayProduct(product),
				error: err => this.errorMessage = err
			});
	}

	saveProduct(): void {
		if (!this.productForm.valid) {
			this.errorMessage = 'Please correct the validation errors.';
			this.notification.error(this.errorMessage, 'ProductForm is invalid');
			return;
		}

		if (!this.productForm.dirty) {
			this.onSaveComplete();
			return;
		}

		// copy properties' values from this.product to new object p
		// and override these values with user entered values from the form.
		// in this way we won't lose initial values that haven't been updated on the form
		const p = { ...this.product, ...this.productForm.value };

		if (p.id === 0) {
			this.productService.createProduct(p)
				.subscribe({
					next: (createdProduct: IProduct) => this.onSaveComplete(
						`New product ${createdProduct.productName} has beed created`),
					error: err => this.errorMessage = err
				});
		} else {
			this.productService.updateProduct(p)
				.subscribe({
					next: (updatedProduct: IProduct) => this.onSaveComplete(
						`${updatedProduct.productName} has been updated`),
					error: err => this.errorMessage = err
				});
		}
	}

	deleteProduct(): void {
		if (this.product.id === 0) {
			// Don't delete, it was never saved.
			this.onSaveComplete();
		} else {
			if (confirm(`Really delete the product: ${this.product.productName}?`)) {
				this.productService.deleteProduct(this.product.id)
					.subscribe({
						next: () => this.onSaveComplete(
							`Product with ID: ${this.product.id} has been deleted`),
						error: err => this.errorMessage = err
					});
			}
		}
	}

	onSaveComplete(successMessage?: string): void {
		// Reset the form to clear the flags
		this.productForm.reset();
		this.router.navigate(['/products']);

		if (successMessage) {
			this.notification.success(successMessage);
		}
	}

	private displayProduct(product: IProduct): void {
		// reset form state
		if (this.productForm) {
			this.productForm.reset();
		}

		this.product = product;

		if (this.product.id === 0) {
			this.pageTitle = 'Add Product';
		} else {
			this.pageTitle = `Edit Product: ${this.product.productName}`;
		}

		// Update the data on the form
		this.productForm.patchValue({
			productName: this.product.productName,
			productCode: this.product.productCode,
			starRating: this.product.starRating,
			description: this.product.description
		});
		this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
	}

	// Defines all the validation messages for the form.
	// These could instead be retrieved from a file or database.
	private getValidationMessages(): { [key: string]: { [key: string]: string } } {
		return {
			productName: {
				required: 'Product name is required.',
				minlength: 'Product name must be at least three characters.',
				maxlength: 'Product name cannot exceed 50 characters.'
			},
			productCode: {
				required: 'Product code is required.'
			},
			starRating: {
				range: 'Rate the product between 1 (lowest) and 5 (highest).'
			}
		};
	}
}
