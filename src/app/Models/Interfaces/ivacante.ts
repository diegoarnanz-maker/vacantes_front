import { Estatus } from "../Enum/estatus";
import { ICategoria } from "./icategoria";
import { IEmpresa } from "./iempresa";
import { ISolicitud } from "./isolicitud";

export interface IVacante {

    idVacante: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    salario: number;
    estatus: Estatus
    destacado: boolean;
    imagen: string;
    detalles: string;
    categoria: ICategoria;
    empresa: IEmpresa;
    solicitudes: ISolicitud[];
}
