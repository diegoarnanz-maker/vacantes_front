import { Component, inject } from '@angular/core';
import { VacanteService } from '../../../Services/vacante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacanteResponse } from '../../../Models/Responses/vacante-response';

@Component({
  selector: 'app-vacante-detail-company',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vacante-detail-company.component.html',
  styleUrl: './vacante-detail-company.component.css'
})
export class VacanteDetailCompanyComponent {

  private serviceVacante = inject(VacanteService);
  private rutaActiva = inject(ActivatedRoute);
  private router = inject(Router);

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

  onELiminar() {
    
    if (!this.vacanteSelect.idVacante) {
      console.error('ID no se ha proporcionado');
      return;
    }
    if (confirm('Está seguro de que quiere eliminar esta vacante?')) {
      this.serviceVacante.deleteVacante(this.vacanteSelect.idVacante).subscribe({
        next: () => {
          this.router.navigate(['vacantes-company'])
        },
        error: (err) => {
            console.error('Error al eliminar:', err);
            alert('No se pudo eliminar la vacante.');
          }
      })
    }
   
  }


}
