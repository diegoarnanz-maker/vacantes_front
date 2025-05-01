import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolicitudService } from '../../../Services/solicitud.service';
import { CommonModule } from '@angular/common';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import { SolicitudCardUserComponent } from "../../../Components/User/solicitud-card-user/solicitud-card-user.component";

@Component({
  selector: 'app-solicitud-list-user',
  standalone: true,
  imports: [SolicitudCardUserComponent, RouterLink],
  templateUrl: './solicitud-list-user.component.html',
  styleUrl: './solicitud-list-user.component.css'
})
export class SolicitudListUserComponent {

  private solicitudService = inject(SolicitudService);
  private route = inject(ActivatedRoute);

  solicitudes: SolicitudResponse[];
 
  isLoading: boolean;
  errorMensaje: string;
  filtroNombre: string;

  constructor() {

    this.solicitudes = [];
    this.errorMensaje = '';
    this.filtroNombre = '';
    this.isLoading = true;
  }

  ngOnInit() {
    this.solicitudService.getMisSolicitudes().subscribe({
      next: (list) => {
        this.solicitudes = list;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar las solicitudes del usuario';
        console.error(err);
        this.isLoading = false;
      }
    })
  }


}