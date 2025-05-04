import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import { SolicitudService } from '../../../Services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-detail-company',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './solicitud-detail-company.component.html',
  styleUrl: './solicitud-detail-company.component.css'
})
export class SolicitudDetailCompanyComponent {

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
      next: (response) => {
        this.solicitudSelect = response;
        this.estadoSolicitud = this.serviceSolicitud.estatusSolicitud(response.estado);
      },
      error: (err) => {
        console.error('No se pudo cargar la solicitud', err);
      }
    });
  }

 adjudicar() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres adjudicar esta solicitud?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, adjudicar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      this.serviceSolicitud
        .adjudicarSolicitud(this.solicitudSelect.idSolicitud)
        .subscribe({
          next: () => {
            Swal.fire({
              title: '¡Adjudicada!',
              text: 'La solicitud ha sido adjudicada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['solicitudes-company', this.solicitudSelect.idVacante]);
            });
          },
          error: err => {
            console.error('Error al adjudicar:', err);
            Swal.fire('Error', 'No se pudo adjudicar la solicitud.', 'error');
          }
        });
    }
  });
}

rechazar() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres rechazar esta solicitud?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, rechazar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      this.serviceSolicitud
        .rechazarSolicitud(this.solicitudSelect.idSolicitud)
        .subscribe({
          next: () => {
            Swal.fire({
              title: '¡Rechazada!',
              text: 'La solicitud ha sido rechazada.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['solicitudes-company', this.solicitudSelect.idVacante]);
            });
          },
          error: err => {
            console.error('Error al rechazar:', err);
            Swal.fire('Error', 'No se pudo rechazar la solicitud.', 'error');
          }
        });
    }
  });
}

}
