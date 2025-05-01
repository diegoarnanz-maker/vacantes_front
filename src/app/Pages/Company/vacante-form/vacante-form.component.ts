import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacanteService } from '../../../Services/vacante.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacanteResponse } from '../../../Models/Responses/vacante-response';
import { VacanteRequest } from '../../../Models/Responses/vacante-request';
import { Estatus } from '../../../Models/Enum/estatus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacante-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, CommonModule],
  templateUrl: './vacante-form.component.html',
  styleUrl: './vacante-form.component.css'
})
export class VacanteFormComponent {
  private vacanteService = inject(VacanteService);
  private router         = inject(Router);
  private rutaActiva     = inject(ActivatedRoute);

  formVacante: FormGroup;

  tipo: string;
  vacanteId: number | null;

  estatusOptions: string[];

  constructor() {
    this.vacanteId = null;

    this.estatusOptions = [ //Para que en el formulario salgan solo las opciones del enum
      Estatus.CREADA,
      Estatus.CUBIERTA,
      Estatus.CANCELADA
    ];

    this.tipo = "Crear";

    this.formVacante = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      salario: new FormControl(null, [Validators.required, Validators.min(0)]),
      estatus: new FormControl(Estatus.CREADA), //El valor por defecto es CREADA (no )
      destacado: new FormControl(false,[]),// El valor por defecto es false
      imagen: new FormControl(null, Validators.required),
      detalles:    new FormControl(null, [Validators.required]),
      idCategoria: new FormControl(null, [Validators.required]),
      // idEmpresa: new FormControl(null,[Validators.required])--> No es necesario ponerla por el fromulario porque en el back se coge el email del usuario autenticado, se busca la empresa asociada a ese email y se le adjudica a la vacante
      
    },[]);
  }

  ngOnInit() {
    this.vacanteId = Number(this.rutaActiva.snapshot.paramMap.get('idVacante'));
    

    if (this.vacanteId) {
      this.tipo = "Modificar";
      this.vacanteService.findByIdVacante(this.vacanteId).subscribe({
        next: (vac: VacanteResponse) => {
          
          this.formVacante = new FormGroup({
            idVacante:   new FormControl(vac.idVacante),
            nombre: new FormControl(vac.nombre, [Validators.required]),
            descripcion: new FormControl(vac.descripcion, [Validators.required]),
            fecha:       new FormControl(vac.fecha, [Validators.required]),
            salario: new FormControl(vac.salario, [Validators.required, Validators.min(0)]),
            estatus: new FormControl(vac.estatus, [Validators.required]),
            destacado: new FormControl(vac.destacado, []),
            imagen: new FormControl(vac.imagen, Validators.required),
            detalles: new FormControl(vac.detalles, [Validators.required]),
            
            idCategoria: new FormControl(vac.idCategoria,[Validators.required]),
            nombreCategoria: new FormControl(vac.nombreCategoria, []),
            
            idEmpresa: new FormControl(vac.idEmpresa, []),
            nombreEmpresa: new FormControl(vac.nombreEmpresa, []),
            pais: new FormControl(vac.pais,[]),
            
          });
        },
        error: err => console.error('Error al cargar vacante', err)
      });
    }
  }

  getDatosForm() {
    
    const vacDataForm: VacanteRequest = this.formVacante.value as VacanteRequest;

    if (this.tipo === "Crear") {
      this.vacanteService.insertVacante(vacDataForm).subscribe({
        next: () => {
          alert('Vacante creada');
          this.router.navigate(['/vacantes-company']);
        },
        error: () => {
          alert('Error al crear vacante');
          this.formVacante.reset();
        }
      });
    } else if (this.tipo==="Modificar") {
      this.vacanteService.updateVacante(this.vacanteId!, vacDataForm).subscribe({
        next: (response: VacanteResponse) => {
          alert('Vacante modificada');
          this.router.navigate(['/vacantes-company']);
        },
        error: () => {
          alert('Error al modificar vacante');
          this.router.navigate(['/vacantes-company']);
        }
      });
    }
  }

  checkControl(formControlName: string, validator: string): boolean| undefined {
    
    return this.formVacante.get(formControlName)?.hasError(validator) && this.formVacante.get(formControlName)?.touched;
  }
}

