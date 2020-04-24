import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		HttpClientModule,
		ProductModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		WelcomeComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
