import { Component, inject, Input } from '@angular/core';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import { RouterLink } from '@angular/router';
import { SolicitudService } from '../../../Services/solicitud.service';

@Component({
  selector: 'app-solicitud-card-company',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './solicitud-card-company.component.html',
  styleUrl: './solicitud-card-company.component.css'
})
export class SolicitudCardCompanyComponent {

  @Input() miSolicitud!: SolicitudResponse;

  private serviceSolicitud = inject(SolicitudService);

  estadoSolicitud: string;

  constructor() {
    this.estadoSolicitud = '';
  }

  ngOnInit() {
    this.estadoSolicitud = this.serviceSolicitud.estatusSolicitud(this.miSolicitud.estado);
  }
}
