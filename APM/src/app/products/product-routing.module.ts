import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsGuard } from './product-details/product-details.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
	{ path: 'products', component: ProductListComponent },
	{
		path: 'products/:id',
		canActivate: [ ProductDetailsGuard ],
		component: ProductDetailsComponent
	},
	{
		path: 'products/:id/edit',
		canDeactivate: [ ProductEditGuard ],
		component: ProductEditComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ProductRoutingModule {}
