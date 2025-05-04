import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UsuarioResponse } from '../Models/Responses/usuario-response';
import { UsuarioRequest } from '../Models/Responses/usuario-request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/usuarios';

  constructor() { }

findAll(): Observable<UsuarioResponse[]>{
return this.http.get<UsuarioResponse[]>(this.apiUrl)
.pipe(
  catchError((error) => {
    console.error(error);
    return throwError(() => new Error('Error al encontrar todos los usuarios'));
  })
);
}

findbyEmail(email: string): Observable<UsuarioResponse> {
  return this.http.get<UsuarioResponse>(`${this.apiUrl}/${email}`)
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error al encontrar usuario'));
      })
    );
}

buscarPorNombre(nombre: string): Observable<UsuarioResponse[]> {
return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/buscar/nombre/${nombre}`)
.pipe(
catchError(error => {
  console.error(error);
  return throwError(() => new Error('Error al buscar usuarios por nombre'));
})
);
}

buscarPorRol(rol: string): Observable<UsuarioResponse[]> {
return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/buscar/rol/${rol}`)
.pipe(
catchError(error => {
  console.error(error);
  return throwError(() => new Error('Error al buscar usuarios por rol'));
})
);
}

buscarPorEstado(estado: number): Observable<UsuarioResponse[]> {
return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/buscar/estado/${estado}`)
.pipe(
  catchError(error => {
    console.error(error);
    return throwError(() => new Error('Error al buscar usuarios por estado'));
  })
);
}

updateUsuario(email: string, dto: UsuarioRequest): Observable<UsuarioResponse> {
  return this.http.put<UsuarioResponse>(`${this.apiUrl}/${email}`, dto)
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error al actualizar el usuario'));
      })
    );
}

desactivarUsuario(email: string): Observable<{ message: string; email: string }> {
  return this.http.put<{ message: string; email: string }>(`${this.apiUrl}/desactivar/${email}`, null)
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error al desactivar el usuario'));
      })
    );
}

activarUsuario(email: string): Observable<{ message: string; email: string }> {
  return this.http.put<{ message: string; email: string }>(`${this.apiUrl}/activar/${email}`, null)
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error al activar el usuario'));
      })
    );
}


}
