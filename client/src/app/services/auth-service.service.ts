import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router: Router) { }

  logout(): void {
    // Clear user session (e.g., localStorage, cookies, etc.)
    localStorage.removeItem('user');
    // Navigate to the register page
    this.router.navigate(['/register']);
  }

  canActivate(): boolean {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
