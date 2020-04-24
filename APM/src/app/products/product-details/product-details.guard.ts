import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../notification.service';

@Injectable({
	providedIn: 'root'
})
export class ProductDetailsGuard implements CanActivate {
	constructor(private _router: Router, private _notification: NotificationService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const id: number = +next.url[1].path;
		if (isNaN(id) || id < 1) {
			this._notification.error('Invalid product id', 'Validation error');
			this._router.navigate(['/products']);

			return false;
		}

		return true;
	}
}
