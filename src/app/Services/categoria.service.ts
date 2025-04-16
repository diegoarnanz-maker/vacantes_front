import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoriaResponse } from '../Models/Responses/categoria-response';
import { CategoriaRequest } from '../Models/Responses/categoria-request';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8089/categorias';
  private http = inject(HttpClient);
  
  constructor() { }

  //Método buscar todas:

  findAllCategoria(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la lista de categorías'));
        })
      );
  }

  //Método buscar una categoría por nombre:

  findByNombreCategoria(nombre: string): Observable<CategoriaResponse[]>{
    return this.http.get<CategoriaResponse[]>(`${this.apiUrl}/buscar/${nombre}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la categoría'));
        })
      );
  }

  //Método buscar una categoría por id:
  
  findByIdCategoria(id: number): Observable<CategoriaResponse>{
    return this.http.get<CategoriaResponse>(`${this.apiUrl}/${id}`)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la categoría'));
        })
      );
  }

  //Método para crear una categoría:

  insertCategoria(campos: CategoriaRequest): Observable<CategoriaResponse>{
    return this.http.post<CategoriaResponse>(this.apiUrl, campos)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al crear una nueva categoría'));
        })
      );
  }

  //Método para modificar una categoría:

  updateCategoria(id: number, campos: CategoriaRequest): Observable<CategoriaResponse>{
    return this.http.put<CategoriaResponse>(`${this.apiUrl}/${id}`, campos)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al modificar una nueva categoría'));
        })
      );
  }

  //Método eliminar categoría:

  deleteCategoria(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error eliminar la categoría'));
        })
      );
  }
}
