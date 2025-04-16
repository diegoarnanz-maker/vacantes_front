import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmpresaRequest } from '../Models/Responses/empresa-request';
import { EmpresaResponse } from '../Models/Responses/empresa-response';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:8089/empresas';
  private http = inject(HttpClient);

  constructor() { }


}
