import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);;
  const router = inject(Router);

  const rol = authService.obtenerRol();

  if (rol === "ADMON") {
    return true;
  }

  router.navigate(['/home']);
  return false;

};
//Para proteger todas las rutas de role admin