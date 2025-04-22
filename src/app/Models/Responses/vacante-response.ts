import { Estatus } from "../Enum/estatus";

export interface VacanteResponse {
    idVacante:       number;
    nombre:          string;
    descripcion:     string;
    fecha:           string;       // ISO date string (e.g. "2025-04-19")
    salario:         number;
    estatus:         Estatus;
    destacado:       boolean;
    imagen:          string;
    detalles:        string;
    
    idCategoria:     number;
    nombreCategoria: string;

    idEmpresa:       number;
    nombreEmpresa:   string;
    pais:            string;
}

