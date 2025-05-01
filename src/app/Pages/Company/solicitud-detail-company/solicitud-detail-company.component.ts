import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import { SolicitudService } from '../../../Services/solicitud.service';

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
    if (confirm('Está seguro de que quiere adjudicar esta solicitud?')) {
      this.serviceSolicitud.adjudicarSolicitud(this.solicitudSelect.idSolicitud).subscribe({
        next: () => {
          this.router.navigate(['solicitudes-company/', this.solicitudSelect.idVacante])

        },
         error: (err) => {
            console.error('Error al adjudicar:', err);
            alert('No se pudo adjudicar la solicitud.');
          }
      })
    }
  }

  rechazar(){
     if (confirm('Está seguro de que quiere rechazar esta solicitud?')) {
      this.serviceSolicitud.rechazarSolicitud(this.solicitudSelect.idSolicitud).subscribe({
        next: () => {
          this.router.navigate(['solicitudes-company/', this.solicitudSelect.idVacante])

        },
         error: (err) => {
            console.error('Error al rechazar:', err);
            alert('No se pudo rechazar la solicitud.');
          }
      })
    }
  }

}
