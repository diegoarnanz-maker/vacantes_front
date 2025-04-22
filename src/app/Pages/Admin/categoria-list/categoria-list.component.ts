import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../../Services/categoria.service';
import {  RouterLink } from '@angular/router';
import { CategoriaResponse } from '../../../Models/Responses/categoria-response';
import { CategoriaCardComponent } from "../../../Components/Admin/categoria-card/categoria-card.component";
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CategoriaCardComponent, RouterLink, FormsModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  categorias: CategoriaResponse[]; //Ponemos la interface CategoriaResponse porque el service devuelve un observable de ese tipo. 
  errorMensaje: string;

  private serviceCategoria = inject(CategoriaService);
  
  filtroNombre: string;
  isLoading: boolean;


  constructor() {
    this.categorias = [];
    this.errorMensaje = '';
    this.filtroNombre = '';
    this.isLoading = true;
  }

  ngOnInit():void{
    this.serviceCategoria.findAllCategoria().subscribe({
      next: (list) => {
        this.categorias = list;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar las categorías';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onCategoriaEliminada(id: number):void {
    // Se aplica el filtro para eliminar la categoria que coincida con el id
    this.categorias = this.categorias.filter(c => c.idCategoria !== id);
  }

 //A la propiedad filtroNombre se le da el valor del input text mombre y al clicar al botón se llama al método buscarNombre

  buscarPorNombre() {

    const nombre = this.filtroNombre.trim();
    if (!nombre) {
      return this.ngOnInit();  
    }
    this.serviceCategoria.findByNombreCategoria(nombre)
      .subscribe({
        next: (list) => {
          this.categorias = list
          this.isLoading = false;

          this.filtroNombre = '';
        },
        error: (err) => {
          this.errorMensaje = 'Error al buscar la categoría';
          console.error(err);
          this.isLoading = false;
        }
      });
  }
}
