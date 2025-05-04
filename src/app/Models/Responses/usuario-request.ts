export interface UsuarioRequest {
    nombre: string;
    apellidos: string;
    rol?: string;
    enabled?: number;
    password?: string;
  }