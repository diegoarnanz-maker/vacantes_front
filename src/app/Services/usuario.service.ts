import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioResponse } from '../Models/Responses/usuario-response';
import { UsuarioRequest } from '../Models/Responses/usuario-request';
import { EmpresaPerfilUpdate } from '../Models/Responses/empresa-perfil-update';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080';

  private http = inject(HttpClient);

  getMiPerfil(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/auth/me`).pipe(
      catchError((error) => {
        console.error('Error al obtener perfil', error);
        return throwError(() => new Error('Error al obtener perfil'));
      })
    );
  }

  actualizarPerfil(datos: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http
      .put<UsuarioResponse>(`${this.apiUrl}/usuarios/perfil`, datos)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar perfil', error);
          return throwError(() => new Error('Error al actualizar perfil'));
        })
      );
  }

  actualizarPerfilEmpresa(dto: EmpresaPerfilUpdate) {
    return this.http.put<{ message: string }>(
      'http://localhost:8080/usuarios/perfil/empresa',
      dto
    );
  }
}
