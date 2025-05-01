import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VacanteService } from '../../../Services/vacante.service';
import { VacanteResponse } from '../../../Models/Responses/vacante-response';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common'; // añado importacion para que no me de error
import { VacanteCardComponent } from "../../../Components/Company/vacante-card/vacante-card.component";

@Component({
  selector: 'app-vacante-list-company',
  standalone: true,
  imports: [RouterLink, FormsModule, VacanteCardComponent],
  templateUrl: './vacante-list-company.component.html',
  styleUrl: './vacante-list-company.component.css'
})
export class VacanteListCompanyComponent {

  private serviceVacante = inject(VacanteService);

  vacantes: VacanteResponse[];
  errorMensaje: string;

  filtroNombre: string;
  isLoading: boolean;

  constructor() {
    this.vacantes = [];
    this.errorMensaje = '';
    this.filtroNombre = '';
    this.isLoading = true;
  }

  //La vacante-lis-COmpany: mostrará las vacantes que pertenezcan al usuario empresa que ha iniciado sesión

  ngOnInit():void {
    this.serviceVacante.findVacantesPropias().subscribe({
      next: (list) => {
        this.vacantes = list;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar las vacantes propias';
        console.error(err);
        this.isLoading = false;
      }
    });
  }



  buscarPorNombre() {
    const nombre = this.filtroNombre.trim();

    if (!nombre) {
      return this.ngOnInit();  
    }
    this.serviceVacante.findByNombreVacante(nombre)
      .subscribe({
        next: (list) => {
          this.vacantes = list;
          this.isLoading = false;

          this.filtroNombre = '';
        },
        error: (err) => {
          this.errorMensaje = 'Error al buscar la vacante';
          console.error(err);
          this.isLoading = false;
        }
      });
  }

}
