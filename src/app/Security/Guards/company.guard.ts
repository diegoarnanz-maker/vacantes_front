import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const companyGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const rol = authService.obtenerRol();

  if (rol === "EMPRESA") {
    return true;
  }
  
  router.navigate(['/home'])
  return false;
};

//Para proteger todas las rutas de role empresa