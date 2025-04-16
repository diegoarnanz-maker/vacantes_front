import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../Models/Responses/login-request';
import { LoginResponse } from '../Models/Responses/login-response';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../Models/Responses/register-request';
import { UsuarioResponse } from '../Models/Responses/usuario-response';
import { IUsuario } from '../Models/Interfaces/iusuario';
import { RegisterResponse } from '../Models/Responses/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8089/auth';
  private http = inject(HttpClient);


  constructor() { }

 /*Método Login*/

  login(credenciales: LoginRequest): Observable<LoginResponse>{


    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciales)
      .pipe( //pipe permite encadenar varias acciones, una tras otra, de forma clara y ordenada. El resultado de una pasa a la siguiente, es como "una cadena de montaje."
        tap((response) => { // Tap permite ejecutar una acción secundaria (guardar datos, logs,etc) sin alterar el valor de los datos
          const userInfo = {
            nombre: response.nombre,
            email: response.email,
            rol: response.rol,
          };
          
          localStorage.setItem('user', JSON.stringify(userInfo)); //Guardamos los datos obtenidos en el localStorage ('user), pero antes los transformamos a cadena de texto en formato JSON.
        }),
        
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al iniciar sesión'));
        })
      );
  }


  /*Método Registrar*/

  registro(credenciales: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, credenciales)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al registrarse'));
        })
      );
  }

  /*Método logout*/

  logout(): void{
    localStorage.removeItem('user');
  }

  
  /*Método me(): sirve para obtener la información del usuario autenticado y mostrarla en el apartao mi_perfil por ejemplo*/

  getUserProfile1(): Observable<UsuarioResponse>{
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/me1`);
  }

  //OPCIÓN 2 (La diferencia está en el back):
    getUserProfile2(): Observable<UsuarioResponse>{
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/me2`);
  }


  //Saber si está autenticado:

  isAuthenticated():boolean {
    
    const user = localStorage.getItem('user');
    if (user)
      return true
    else
      return false;

  }


  //Obtener el rol del usuario autenticado:

  obtenerRol(): string | null {

   const user = localStorage.getItem('user'); //Esto devuelve unacadena JSON o un null si no existe
    if (user) {
      const userLocal = JSON.parse(user); //Se convierte en un objeto JavaScript
      console.log(userLocal.rol);
      return userLocal.rol;
      
  }
    return null;
  }



}
