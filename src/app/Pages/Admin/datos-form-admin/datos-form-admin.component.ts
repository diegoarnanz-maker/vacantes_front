import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../Services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioRequest } from '../../../Models/Responses/usuario-request';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';

@Component({
  selector: 'app-datos-form-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-form-admin.component.html',
  styleUrl: './datos-form-admin.component.css',
})
export class DatosFormAdminComponent implements OnInit {
  form!: FormGroup;
  isLoading = true;
  errorMensaje = '';
  usuario!: UsuarioResponse;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getMiPerfil().subscribe({
      next: (data) => {
        this.usuario = {
          ...data,
          nombre: String(data.nombre),
          apellidos: String(data.apellidos),
        };
        this.initForm();
        this.isLoading = false;
      },
      error: () => {
        this.errorMensaje =
          'No se pudieron cargar los datos del administrador.';
        this.isLoading = false;
      },
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: [
        this.usuario.nombre,
        [Validators.required, Validators.minLength(2)],
      ],
      apellidos: [
        this.usuario.apellidos,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const datos: UsuarioRequest = {
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
    };

    this.usuarioService.actualizarPerfil(datos).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Los datos fueron actualizados.', 'success').then(
          () => {
            this.router.navigateByUrl('/miPerfil-admin');
          }
        );
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
      },
    });
  }

  onCancelar(): void {
    this.router.navigateByUrl('/miPerfil-admin');
  }
}
