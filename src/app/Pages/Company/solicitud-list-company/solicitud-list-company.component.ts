import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolicitudService } from '../../../Services/solicitud.service';
import { SolicitudResponse } from '../../../Models/Responses/solicitud-response';
import { SolicitudCardCompanyComponent } from "../../../Components/Company/solicitud-card-company/solicitud-card-company.component";
import { FormsModule } from '@angular/forms';
import { VacanteService } from '../../../Services/vacante.service';

@Component({
  selector: 'app-solicitud-list-company',
  standalone: true,
  imports: [SolicitudCardCompanyComponent, FormsModule, RouterLink],
  templateUrl: './solicitud-list-company.component.html',
  styleUrl: './solicitud-list-company.component.css'
})
export class SolicitudListCompanyComponent {

  private solicitudService = inject(SolicitudService);
  private vacanteService = inject(VacanteService);
  private rutaActiva = inject(ActivatedRoute);

  solicitudes: SolicitudResponse[];
  nombreVacante: string;

  isLoading: boolean;
  errorMensaje: string;
  filtroNombre: string;

  constructor() {

    this.solicitudes = [];
    this.errorMensaje = '';
    this.filtroNombre = '';
    this.isLoading = true;
    this.nombreVacante = '';
  }

  //recibe una id vacante por la url y llama al back end que devolverá la lista de solicitudes para esa vacante
  ngOnInit() {
    const id = Number(this.rutaActiva.snapshot.paramMap.get('idVacante'));

    this.solicitudService.getSolicitudesPorVacante(id).subscribe({
      next: (list) => {
        this.solicitudes = list;

        this.vacanteService.findByIdVacante(id).subscribe({  //Se usa el método buscar vacante por su id del VacanteService, nos suscribimos y extraemos la propiedad nombre
                                                              //que asignamos a la propiedad nombreVacante. 
          next: (vacant) => {
            this.nombreVacante = vacant.nombre;
          }
        })
        
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar las solicitudes de la vacante';
        console.error(err);
        this.isLoading = false;
      }
    })
    
  }

}
