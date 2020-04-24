import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { paths } from './app-paths';
import { PathResolver } from './path.resolver';

const routes: Routes = [
	{ path: paths.welcome, component: WelcomeComponent },
	{ path: '', redirectTo: paths.welcome, pathMatch: 'full' },
	{
		path: '**',
		resolve: {
			path: PathResolver
		},
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
