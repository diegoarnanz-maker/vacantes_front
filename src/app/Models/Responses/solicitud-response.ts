export interface SolicitudResponse {
     
  idSolicitud: number;
  fecha: string;
  archivo: string;
  curriculum: string;
  comentarios: string | null;
  estado: number;

  //  Datos de la vacante asociada 
  idVacante: number;
  nombreVacante: string;
  descripcionVacante: string;
  salarioVacante: number;
  detalleVacante: number;
  imagenVacante: string;
  nombreEmpresa: string;

  /* Categoría de la vacante */
  categoriaVacante: string;

  // Datos del usuario solicitante 

  emailUsuario: string;
  nombreUsuario: string;
  apellidosUsuario: string;
}
