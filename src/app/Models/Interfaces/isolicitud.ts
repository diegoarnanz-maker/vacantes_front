import { IUsuario } from "./iusuario";
import { IVacante } from "./ivacante";

export interface ISolicitud {
    idSolicitud?: number;
    fecha: string;      // 
    archivo: string;
    comentarios: string;    // puede ser nulo pero en el formulario indicaremos que sea required
    estado: number;
    curriculum: string;     // puede ser nulo pero en el formulario indicaremos que sea required
    vacante: IVacante;
    usuario: IUsuario;
}
