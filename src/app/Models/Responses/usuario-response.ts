export interface UsuarioResponse {
    email: string ;
    nombre:String;
    apellidos: String;
    rol: String;
    enabled: number;
    fechaRegistro: Date;

    //Datos empresa si tienen una empresa asociada:
    nombreEmpresa?: string;
    cifEmpresa?: string;
    direccionFiscal?: string;
    paisEmpresa?: string;

}
