import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const result = this.auth.isAuthenticated();
      if (!result) {
        this.router.navigate(["/"]);
        return false;
      }

      const user = this.auth.user;
      if (next.data.admin) {
        this.router.navigate(["/"]);
        return user.role === "admin";
      }

      return true;
  }
}
