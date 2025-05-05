import { VacanteResponse } from './vacante-response';

export interface EmpresaResponse {
  idEmpresa: number;
  cif: string;
  nombreEmpresa: string;
  direccionFiscal: string;
  pais: string;
  email: string;
  nombre: string;
  apellidos: string;
  vacantes: VacanteResponse[];
}
