import { Component, inject } from '@angular/core';
import { SolicitudService } from '../../../Services/solicitud.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-detail-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './solicitud-detail-user.component.html',
  styleUrl: './solicitud-detail-user.component.css'
})
export class SolicitudDetailUserComponent {

  private serviceSolicitud = inject(SolicitudService);
  private rutaActiva = inject(ActivatedRoute);
  private router = inject(Router);

  solicitudSelect!: SolicitudResponse;

  estadoSolicitud: string;
  
  constructor() {
    this.estadoSolicitud = '';
  }
  
  ngOnInit() {
    const id = Number(this.rutaActiva.snapshot.paramMap.get('idSolicitud'));

    this.serviceSolicitud.findById(id).subscribe({
      next: (response: SolicitudResponse) => {
        this.solicitudSelect = response;
        this.estadoSolicitud = this.serviceSolicitud.estatusSolicitud(response.estado);
      },
         error: (err) => {
            console.error('No se pudo cargar la solicitud', err);
          }
    })

  }


  async cancelarSolicitud() {
  if (!this.solicitudSelect.idSolicitud) {
    console.error('El id no se ha proporcionado');
    return;
  }

  // 1. Mostramos el diálogo de confirmación
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cancelar la suscripción?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No'
  });

  // 2. Si el usuario confirma, llamamos al servicio
  if (result.isConfirmed) {
    this.serviceSolicitud.cancelarSolicitud(this.solicitudSelect.idSolicitud)
      .subscribe({
        next: () => {
          // 3. Mostramos alerta de éxito y navegamos
          Swal.fire({
            title: '¡Cancelada!',
            text: 'La solicitud ha sido cancelada correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['solicitudes-user']);
        },
        error: (err) => {
          console.error('Error al cancelar:', err);
          // 4. Mostramos alerta de error
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cancelar la solicitud.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      });
  }
}
  
}

