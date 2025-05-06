import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UsuarioResponse } from '../Models/Responses/usuario-response';
import { UsuarioRequest } from '../Models/Responses/usuario-request';
import { EmpresaPerfilUpdate } from '../Models/Responses/empresa-perfil-update';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  // ZONA ADMIN
  findAll(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al encontrar todos los usuarios'));
      })
    );
  }

  findbyEmail(email: string): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/usuarios/${email}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al encontrar usuario'));
      })
    );
  }

  buscarPorNombre(nombre: string): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios/buscar/nombre/${nombre}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al buscar usuarios por nombre'));
      })
    );
  }

  buscarPorRol(rol: string): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios/buscar/rol/${rol}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al buscar usuarios por rol'));
      })
    );
  }

  buscarPorEstado(estado: number): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/usuarios/buscar/estado/${estado}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al buscar usuarios por estado'));
      })
    );
  }

  updateUsuario(email: string, dto: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/usuarios/${email}`, dto).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al actualizar el usuario'));
      })
    );
  }

  desactivarUsuario(email: string): Observable<{ message: string; email: string }> {
    return this.http.put<{ message: string; email: string }>(`${this.apiUrl}/usuarios/desactivar/${email}`, null).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al desactivar el usuario'));
      })
    );
  }

  activarUsuario(email: string): Observable<{ message: string; email: string }> {
    return this.http.put<{ message: string; email: string }>(`${this.apiUrl}/usuarios/activar/${email}`, null).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Error al activar el usuario'));
      })
    );
  }

  // ZONA USER
  getMiPerfil(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/auth/me`).pipe(
      catchError((error) => {
        console.error('Error al obtener perfil', error);
        return throwError(() => new Error('Error al obtener perfil'));
      })
    );
  }

  actualizarPerfil(datos: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/usuarios/perfil`, datos).pipe(
      catchError((error) => {
        console.error('Error al actualizar perfil', error);
        return throwError(() => new Error('Error al actualizar perfil'));
      })
    );
  }

  actualizarPerfilEmpresa(dto: EmpresaPerfilUpdate) {
    return this.http.put<{ message: string }>(`${this.apiUrl}/usuarios/perfil/empresa`, dto);
  }
}
