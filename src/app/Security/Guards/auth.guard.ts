import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  

  const authService = inject(AuthService);
  const router = inject(Router);


  //Si no está autenticado se le redirigirá al login
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;

};
