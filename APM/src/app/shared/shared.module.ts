import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star/star.component';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		StarComponent,
		ConvertToSpacesPipe
	],
	exports: [
		CommonModule,
		FormsModule,
		StarComponent,
		ConvertToSpacesPipe
	]
})
export class SharedModule { }
