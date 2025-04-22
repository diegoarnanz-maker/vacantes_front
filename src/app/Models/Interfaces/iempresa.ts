import { IUsuario } from "./iusuario";
import { IVacante } from "./ivacante";

export interface IEmpresa {

    idEmpresa?: number;
    cif: string;
    nombreEmpresa: string;
    direccionFiscal: string;  // Puede ser nul en la BBDD pero se marcará como required en el formulario
    pais: string;   // Puede ser nul en la BBDD pero se marcará como required en el formulario
    usuario: IUsuario;   
    vacantes: IVacante[]; 

}
