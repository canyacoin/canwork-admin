import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserRole } from 'src/app/_state/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = this.userService.getUser();

    if (user.isAuthenticated && user.role === UserRole.SysAdmin) {
      this.router.navigate(['/dashboard-admin']);
      return true;
    }

    if (user.isAuthenticated && user.role === UserRole.SysOwner) {
      this.router.navigate(['/dashboard-owner']);
      return true;
    }

    if (user.isAuthenticated && user.role === UserRole.DaoUser) {
      this.router.navigate(['/dashboard']);
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
}
