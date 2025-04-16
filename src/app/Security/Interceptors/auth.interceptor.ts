import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cloneRequest = req.clone({
    setHeaders: {
      'Authorization': localStorage.getItem("user") || ""
    }
  })
  if (cloneRequest.url.includes("auth")) {
     return next(req);
   }
  else {
    return next(cloneRequest);
  }
 
};
