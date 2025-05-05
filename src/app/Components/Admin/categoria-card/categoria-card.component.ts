import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../Services/categoria.service';
import { CategoriaResponse } from '../../../Models/Responses/categoria-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categoria-card.component.html',
  styleUrl: './categoria-card.component.css'
})
export class CategoriaCardComponent {

  @Input() miCategoria!: CategoriaResponse;

  @Output() eliminado = new EventEmitter<number>();

  private categoriaService = inject(CategoriaService);


 onEliminar() {
  if (!this.miCategoria.idCategoria) {
    console.error('ID no se ha proporcionado');
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      this.categoriaService.deleteCategoria(this.miCategoria.idCategoria!)
        .subscribe({
          next: () => {
            this.eliminado.emit(this.miCategoria.idCategoria);
            Swal.fire(
              '¡Eliminado!',
              'La categoría ha sido eliminada.',
              'success'
            );
          },
          error: err => {
            console.error('Error al eliminar:', err);
            Swal.fire(
              'Error',
              'No se pudo eliminar la categoría.',
              'error'
            );
          }
        });
    }
  });
}
}

   //Se usa elOutput para notificar al componente padre que se ha eliminado un componente card de la lista, y que este actualice la vista.
    //Podríamos haber redirigido con el router.navigate a la misma página pero de esta manera evitamos volver a cargar la página de nuevo

