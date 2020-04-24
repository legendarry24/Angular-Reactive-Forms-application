import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './home/welcome.component';

const routes: Routes = [
	{ path: 'welcome', component: WelcomeComponent },
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: '**', redirectTo: 'welcome', pathMatch: 'full' } // refactor to use PageNotFoundComponent
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
