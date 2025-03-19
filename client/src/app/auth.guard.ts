import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router dependency
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if (!user) {
    return true;
  } else {
      router.navigate(['/home']);
    return false;
  }
};
