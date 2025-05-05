import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmpresaRequest } from '../Models/Responses/empresa-request';
import { EmpresaResponse } from '../Models/Responses/empresa-response';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/empresas';
  private http = inject(HttpClient);

  constructor() {}

  findAll(): Observable<EmpresaResponse[]> {
    return this.http.get<EmpresaResponse[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error('Error al obtener empresas', err);
        return throwError(() => err);
      })
    );
  }

  findById(id: number): Observable<EmpresaResponse> {
    return this.http.get<EmpresaResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error al obtener la empresa por ID', err);
        return throwError(() => err);
      })
    );
  }

  update(id: number, body: EmpresaRequest): Observable<EmpresaResponse> {
    return this.http.put<EmpresaResponse>(`${this.apiUrl}/${id}`, body).pipe(
      catchError((err) => {
        console.error('Error al actualizar la empresa', err);
        return throwError(() => err);
      })
    );
  }

  desactivarEmpresa(id: number): Observable<{ message: string }> {
    console.log('Entrando en desactivarEmpresa()');

    return this.http
      .put<{ message: string }>(`${this.apiUrl}/desactivar/${id}`, {})
      .pipe(
        catchError((err) => {
          console.error('Error al desactivar la empresa', err);
          return throwError(() => err);
        })
      );
  }

  activarEmpresa(id: number): Observable<{ message: string }> {
    return this.http
      .put<{ message: string }>(`${this.apiUrl}/activar/${id}`, {})
      .pipe(
        catchError((err) => {
          console.error('Error al activar la empresa', err);
          return throwError(() => err);
        })
      );
  }

  findDesactivadas(): Observable<EmpresaResponse[]> {
    return this.http.get<EmpresaResponse[]>(`${this.apiUrl}/desactivadas`).pipe(
      catchError((err) => {
        console.error('Error al obtener empresas desactivadas', err);
        return throwError(() => err);
      })
    );
  }  

  register(body: EmpresaRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      catchError((err) => {
        console.error('Error al registrar la empresa', err);
        return throwError(() => err);
      })
    );
  }
}
