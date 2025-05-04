import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SolicitudRequest } from '../Models/Responses/solicitud-request';
import { SolicitudResponse } from '../Models/Responses/solicitud-response';

@Injectable({ providedIn: 'root' })
export class SolicitudService {

  private http = inject(HttpClient);
  // private apiUrl = 'http://localhost:8080/solicitudes'; // lo he tenido que cambiar para que corra en el 9090
  private apiUrl = 'http://localhost:8080/solicitudes';

  constructor() { }

  //Buscar solicitud por su id:

  findById(id: number): Observable<SolicitudResponse> {
    return this.http.get<SolicitudResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(`Error al encontrar la solicitud ${id}:`, error);
          return throwError(() => new Error('Error al encontrar la solicitud'));
        })
      );
  }

  //Para crear una nueva solicitud :
  
  createSolicitud(solicitud: SolicitudRequest): Observable<SolicitudResponse> {
    return this.http.post<SolicitudResponse>(this.apiUrl, solicitud)
      .pipe(
        catchError((error) => {
          console.error('Error al crear la solicitud:', error);
          return throwError(() => new Error('Error al crear la solicitud'));
        })
      );
  }

  /**
   * Obtiene las solicitudes del usuario autenticado (GET /solicitudes/mis-solicitudes)
   */
  getMisSolicitudes(): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.apiUrl}/mis-solicitudes`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener mis solicitudes:', error);
          return throwError(() => new Error('Error al obtener mis solicitudes'));
        })
      );
  }

  /**
   * Cancela una solicitud por su ID (DELETE /solicitudes/{id})
   */
  cancelarSolicitud(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error(`Error al cancelar la solicitud ${id}:`, error);
          return throwError(() => new Error('Error al cancelar la solicitud'));
        })
      );
  }

  /**
   * Para la parte de empresa: obtiene solicitudes de una vacante (GET /solicitudes/vacante/{idVacante})
   */
  getSolicitudesPorVacante(vacanteId: number): Observable<SolicitudResponse[]> {
    return this.http.get<SolicitudResponse[]>(`${this.apiUrl}/vacante/${vacanteId}`)
      .pipe(
        catchError((error) => {
          console.error(`Error al obtener solicitudes de la vacante ${vacanteId}:`, error);
          return throwError(() => new Error('Error al obtener solicitudes por vacante'));
        })
      );
  }

  /**
   * Adjudica una solicitud (PUT /solicitudes/adjudicar/{id})
   */
  adjudicarSolicitud(id: number): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/adjudicar/${id}`, null) //Se pone null para indicar que no enviamos nada por el body de la url ya que no es necesario. También se podría poner un cuerpovacío {}
      .pipe(
        catchError((error) => {
          console.error(`Error al adjudicar la solicitud ${id}:`, error);
          return throwError(() => new Error('Error al adjudicar la solicitud'));
        })
      );
  }

  /**
   * Rechazar una solicitud (PUT /solicitudes/desadjudicar/{id})
   */
  rechazarSolicitud(id: number): Observable<SolicitudResponse> {
    return this.http.put<SolicitudResponse>(`${this.apiUrl}/rechazar/${id}`, null)
      .pipe(
        catchError((error) => {
          console.error(`Error al rechazar la solicitud ${id}:`, error);
          return throwError(() => new Error('Error al rechazar la solicitud'));
        })
      );
  }


  //Método necesario para convertir el valor de int estado de solicitud (back) a un String (front)
  estatusSolicitud(numEstado: number): string {
    switch (numEstado) {
      case 0: return "Pendiente de valorar";
      case 1: return "Adjudicada";
      default: return "Rechazada";
    }
  }
}
