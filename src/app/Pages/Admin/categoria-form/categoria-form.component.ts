import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../../Services/categoria.service';
import { CategoriaResponse } from '../../../Models/Responses/categoria-response';
import { CategoriaRequest } from '../../../Models/Responses/categoria-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  private categoriaService = inject(CategoriaService);
  private route = inject(Router);
  private rutaActiva = inject(ActivatedRoute);

  formCategoria: FormGroup;
  
  tipo: string;
  categoriaId: number|null; //puede serde tipo numero o null (no existir)

  constructor() {
    
    this.categoriaId = null; //Al crear una categoría el id está a null, se lo adjudica la BBDDcuando se crea.

    //Creamos la variable tipo para determinar eltipo de formulario que se va a mostrar (crear o modificar)
    this.tipo = "Crear";

    this.formCategoria = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl(null, [Validators.required, Validators.minLength(10)])
    }, []);

  }

  ngOnInit() {
    //Con esta opción se lee el parámetro de la ruta unicamente al iniciar el componente.
    //En este caso ya es suficiente, ya que no habrán más cambios en la ruta mientras el componente esté activo. 
    this.categoriaId = Number (this.rutaActiva.snapshot.paramMap.get('idCategoria')); //Convertimos el string idCategoria que hemos obtenido de la ruta enformatoJSON y lo transformamos a Number
    
    if (this.categoriaId) { //SI el id existe 
      this.tipo = "Modificar";
      this.categoriaService.findByIdCategoria(this.categoriaId).subscribe({
        next: (cat: CategoriaResponse) => {
          this.formCategoria = new FormGroup({
            idCategoria: new FormControl(cat.idCategoria, []),
            nombre: new FormControl(cat.nombre, [Validators.required, Validators.minLength(3)]),
            descripcion: new FormControl(cat.descripcion, [Validators.required, Validators.minLength(10)])
          });
        },
        error: (err) => {
          console.error('No se pudo cargar la categoría', err);
         
        }
      });

    }
  }

getDatosForm() {
  const catDataForm: CategoriaRequest = this.formCategoria.value as CategoriaRequest;

  if (this.tipo === 'Crear') {
    this.categoriaService.insertCategoria(catDataForm).subscribe({
      next: (response: CategoriaResponse) => {
        Swal.fire({
          title: '¡Creada!',
          text: 'La categoría ha sido creada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.route.navigate(['categorias']);
        });
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la categoría.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
        this.formCategoria.reset();
      }
    });
  } else if (this.tipo === 'Modificar') {
    this.categoriaService.updateCategoria(this.categoriaId!, catDataForm).subscribe({
      next: (response: CategoriaResponse) => {
        Swal.fire({
          title: '¡Modificada!',
          text: 'La categoría se ha actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.route.navigate(['categorias']);
        });
      },
      error: (error) => {
        console.error('Error al modificar categoría:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo modificar la categoría.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        }).then(() => {
          this.route.navigate(['categorias']);
        });
      }
    });
  }
}

   checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.formCategoria.get(formControlName)?.hasError(validador) && this.formCategoria.get(formControlName)?.touched 
    ;
  }

}
