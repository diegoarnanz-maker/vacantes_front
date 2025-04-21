import { Component, inject } from '@angular/core';
import { VacanteService } from '../../Services/vacante.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VacanteResponse } from '../../Models/Responses/vacante-response';

@Component({
  selector: 'app-vacante-detail-public',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vacante-detail-public.component.html',
  styleUrl: './vacante-detail-public.component.css'
})
export class VacanteDetailPublicComponent {

    private serviceVacante = inject(VacanteService);
    private rutaActiva = inject(ActivatedRoute);
  
  
    vacanteSelect!: VacanteResponse; //No la inicializamos ya que obtendrá su valor a través de la id dela ruta
  
    constructor() {
  
      
    }
    ngOnInit() {
      const id = Number(this.rutaActiva.snapshot.paramMap.get('idVacante'));
      
      this.serviceVacante.findByIdVacante(id).subscribe({
        next: (response: VacanteResponse) => {
          this.vacanteSelect = response;
        },
         error: (err) => {
            console.error('No se pudo cargar la vacante', err);
          }
      })
    }
  
   
}
