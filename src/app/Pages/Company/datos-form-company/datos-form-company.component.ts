import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-datos-form-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-form-company.component.html',
  styleUrls: ['./datos-form-company.component.css'],
})
export class DatosFormCompanyComponent implements OnInit {
  form!: FormGroup;
  isLoading = true;
  errorMensaje = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getMiPerfil().subscribe({
      next: (data) => {
        this.form = this.fb.group({
          nombreEmpresa: [data.nombreEmpresa, [Validators.required]],
          cif: [data.cifEmpresa, [Validators.required]],
          direccionFiscal: [data.direccionFiscal, [Validators.required]],
          pais: [data.paisEmpresa, [Validators.required]],
        });

        this.isLoading = false;
      },
      error: () => {
        this.errorMensaje = 'No se pudieron cargar los datos de la empresa.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.usuarioService.actualizarPerfilEmpresa(this.form.value).subscribe({
      next: (resp) => {
        Swal.fire('¡Éxito!', resp.message, 'success').then(() => {
          this.router.navigateByUrl('/miPerfil-company');
        });
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudo actualizar el perfil de la empresa.',
          'error'
        );
      },
    });
  }

  onCancelar(): void {
    this.router.navigateByUrl('/miPerfil-company');
  }
}
