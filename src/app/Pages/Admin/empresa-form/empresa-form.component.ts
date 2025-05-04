import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../Services/empresa.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css',
})
export class EmpresaFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);

  form!: FormGroup;
  modoEdicion: boolean = false;
  idEmpresa!: number;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      cif: ['', Validators.required],
      direccionFiscal: ['', Validators.required],
      pais: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('idEmpresa');
    if (id) {
      this.modoEdicion = true;
      this.idEmpresa = +id;
      this.empresaService.findById(this.idEmpresa).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: (err) => {
          console.error('Error al cargar datos de la empresa', err);
        },
      });
    }
  }

  onSubmit(): void {
    console.log('Formulario enviado', this.form.value);
    if (this.form.invalid) return;

    const body = this.form.value;

    if (this.modoEdicion) {
      this.empresaService.update(this.idEmpresa, body).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Empresa actualizada con éxito', 'success');
          this.router.navigate(['/empresas']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar la empresa', 'error');
        },
      });
    } else {
      this.empresaService.register(body).subscribe({
        next: (res) => {
          Swal.fire(
            'Registrada',
            `Empresa creada con éxito. Password: ${res.passwordGenerada}`,
            'success'
          );
          this.router.navigate(['/empresas']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo registrar la empresa', 'error');
        },
      });
    }
  }
}
