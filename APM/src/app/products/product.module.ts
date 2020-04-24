import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		InMemoryWebApiModule.forRoot(ProductData),
		ProductRoutingModule
	],
	declarations: [
		ProductListComponent,
		ProductDetailsComponent,
		ProductEditComponent,
	]
})
export class ProductModule { }
