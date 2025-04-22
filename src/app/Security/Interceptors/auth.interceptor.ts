import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // NO tocar las llamadas de login/register. Devuelven la ruta original sin cabeceras
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next(req);
    }

    // Se obtiene elitem que se ha guardado en el login 'basicAuth'
    const basic = localStorage.getItem('basicAuth');
    if (basic) {
      // Si existe, clonamos la llamada/url y se lo añadimos en las cabeceras
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Basic ${basic}` //Esto nos permitirá acceder a las rutas que estén capadas en el SpringSecurityConfig.java
        }
      });
      return next(authReq);
    }

    // si no hay credenciales, pasa la petición tal cual
    return next(req);
  };





