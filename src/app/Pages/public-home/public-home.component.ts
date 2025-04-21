import { Component, inject } from '@angular/core';
import { VacanteService } from '../../Services/vacante.service';
import { VacanteResponse } from '../../Models/Responses/vacante-response';
import { VacanteCardComponent } from "../../Components/Company/vacante-card/vacante-card.component";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [VacanteCardComponent, FormsModule],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.css'
})
export class PublicHomeComponent {


  private serviceVacante = inject(VacanteService);

  vacantes: VacanteResponse[];
  errorMensaje: string;

  filtroNombre: string;
  filtroEmpresa: string;
  filtroCategoria: string;
  filtroSalario: number;

  isLoading: boolean;

  constructor() {
    this.vacantes = [];
    this.errorMensaje = '';

    this.filtroNombre = '';
    this.filtroEmpresa = '';
    this.filtroCategoria = '';
    this.filtroSalario = 0;

    this.isLoading = true;
  }
  
  ngOnInit():void {
    this.serviceVacante.findAll().subscribe({
      next: (list) => {
        this.vacantes = list.filter(v => v.estatus === "CREADA"); //Se filtran para que solo se muestren las creadas, Ni cubiertas ni canceladas
        this.isLoading = false;                                   //Si tuviéramos muchas vacantes se debería hacer por el back para filtrar des de un inicio y no saturar el programa
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar las vacantes creadas';
        console.error(err);
        this.isLoading = false;
      }
    });

  }

  //Buscar por nombre vacante
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

          this.filtroNombre = ''; //lo reseteamos
        },
        error: (err) => {
          this.errorMensaje = 'Error al buscar la vacante';
          console.error(err);
          this.isLoading = false;
        }
      });
  }
  //Buscar por nombre empres:
  

  buscarPorNombreEmpresa() {
    const nombreEmpresa = this.filtroEmpresa.trim();

    if (!nombreEmpresa) {
      return this.ngOnInit();  
    }
    this.serviceVacante.findByNombreEmpresa(nombreEmpresa)
      .subscribe({
        next: (list) => {
          this.vacantes = list;
          this.isLoading = false;

          this.filtroEmpresa = '';
        },
        error: (err) => {
          this.errorMensaje = 'Error al buscar la vacante';
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  //Buscar por nombre categoria

  buscarPorNombreCategoria() {
    const nombreCategoria = this.filtroCategoria.trim();

    if (!nombreCategoria) {
      return this.ngOnInit();  
    }
    this.serviceVacante.findByNombreCategoria(nombreCategoria)
      .subscribe({
        next: (list) => {
          this.vacantes = list;
          this.isLoading = false;

          this.filtroCategoria = '';
        },
        error: (err) => {
          this.errorMensaje = 'Error al buscar la vacante';
          console.error(err);
          this.isLoading = false;
        }
      });
  }


  //Por salario superior a:

  buscarPorSalario() {

    const valor = this.filtroSalario;

    if (!valor) {
      return this.ngOnInit();
    }

    this.serviceVacante.findBySalario(valor).subscribe({
      next: (list) => {
        this.vacantes = list;
        this.isLoading = false;

        this.filtroSalario = 0;
      },
      error: err => {
        this.errorMensaje = 'No se pudieron cargar las vacantes por salario';
        console.error(err);
        this.isLoading = false;
      }
    });
  }



}
