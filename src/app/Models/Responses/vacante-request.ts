import { Estatus } from "../Enum/estatus";

export interface VacanteRequest {
    nombre:      string;
    descripcion: string;
    fecha:       string;    
    salario:     number;
    estatus?:     Estatus; // Cuando se crea la vacante, se añade directamente estado CREADA en el back. 
    destacado:   boolean;
    imagen:      string;
    detalles:    string;
    
    idCategoria: number;
    idEmpresa?:   number; //Se adjudica en el back no necesitamos pasarle por el formulario
}
