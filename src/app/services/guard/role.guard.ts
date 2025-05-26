import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { UserService } from '../../services/user.service'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role']
    const user = this.userService.getCurrentUser()

    if (user && user.type === requiredRole) {
      return true
    }

    this.router.navigate(['/unauthorized'])
    return false
  }
}
