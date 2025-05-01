import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VacanteResponse } from '../Models/Responses/vacante-response';
import { catchError, Observable, throwError } from 'rxjs';
import { VacanteRequest } from '../Models/Responses/vacante-request';


@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private http = inject(HttpClient);
  
  //private apiUrl = 'http://localhost:8080/vacantes';
    private apiUrl = 'http://localhost:8089/vacantes';

  constructor() { }

  //Método buscar todas:--> al implementarlo filtrar por estado creada (sol ose mostraran las creadas.)

  findAll(): Observable<VacanteResponse[]>{
    return this.http.get<VacanteResponse[]>(this.apiUrl)
    .pipe(
            catchError((error) => {
              console.error(error);
              return throwError(() => new Error('Error al encontrar todas las vacantes'));
            })
          );
  }

  //Método buscar vacantes por nombre vacante:

  findByNombreVacante(nombre:string): Observable<VacanteResponse[]> {
    return this.http.get<VacanteResponse[]>(`${this.apiUrl}/buscar/${nombre}`)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la lista de vacantes'));
        })
      );
  }

  //Método buscar vacante por ID vacante:

  findByIdVacante(id:number): Observable<VacanteResponse> {
    return this.http.get<VacanteResponse>(`${this.apiUrl}/${id}`)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la vacante'));
        })
      );
  }

  //Método buscar por salario:

    findBySalario(salario: number): Observable<VacanteResponse[]> {
    return this.http
      .get<VacanteResponse[]>(`${this.apiUrl}/salario/${salario}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al buscar vacantes por salario'));
        })
      );
   } 


  //Método buscar vacantes por nombre de la categoria:

  findByNombreCategoria(nombre:string): Observable<VacanteResponse[]> {
    return this.http.get<VacanteResponse[]>(`${this.apiUrl}/categoria/${nombre}`)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la lista de vacantes'));
        })
      );
  }

  //Método buscar vacantes por nombre Empresa:

  findByNombreEmpresa(nombre:string): Observable<VacanteResponse[]> {
    return this.http.get<VacanteResponse[]>(`${this.apiUrl}/empresa/${nombre}`)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al encontrar la lista de vacantes'));
        })
      );
  }


  //Método buscar lasvacantesque pertenecen a la empresa logeada

  findVacantesPropias(): Observable<VacanteResponse[]>{
    return this.http.get<VacanteResponse[]>(`${this.apiUrl}/propias`)
    .pipe(
            catchError((error) => {
              console.error(error);
              return throwError(() => new Error('Error al encontrar todas las vacantes'));
            })
          );
  }


  //Método crear vacante:

  insertVacante(vacante: VacanteRequest): Observable<VacanteResponse> {
    return this.http.post<VacanteResponse>(this.apiUrl, vacante)
    .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error al crear la vacante'));
        })
      );
  }


  //Método modificar vacante:

  updateVacante(id:number, vacante: VacanteRequest): Observable<VacanteResponse> {
      return this.http.put<VacanteResponse>(`${this.apiUrl}/${id}`, vacante)
      .pipe(
          catchError((error) => {
            console.error(error);
            return throwError(() => new Error('Error al modificar la vacante'));
          })
        );
  }


  //Método eliminar vacante (cambiar status a cancelada)
  deleteVacante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error eliminar la categoría'));
        })
      );
  }


}
