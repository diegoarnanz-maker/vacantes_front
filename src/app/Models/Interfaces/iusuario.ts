import { IEmpresa } from "./iempresa";
import { ISolicitud } from "./isolicitud";

export interface IUsuario {
  email?: string;
  nombre: string;
  apellidos: string;
  password: string;
  enabled: number;
  fechaRegistro: string;       
  rol: string;
  empresa?: IEmpresa;     // sólo si rol = EMPRESA
  solicitudes: ISolicitud[]; 

}
