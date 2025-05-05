import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../Services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-form-user.component.html',
  styleUrl: './datos-form-user.component.css',
})
export class DatosFormUserComponent implements OnInit {
  form!: FormGroup;
  isLoading = true;
  errorMensaje = '';
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getMiPerfil().subscribe({
      next: (data) => {
        this.usuario = data;
        this.initForm();
        this.isLoading = false;
      },
      error: () => {
        this.errorMensaje = 'No se pudieron cargar los datos del usuario.';
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

    this.usuarioService.actualizarPerfil(this.form.value).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Los datos fueron actualizados.', 'success').then(
          () => {
            this.router.navigateByUrl('/miPerfil-user');
          }
        );
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
      },
    });
  }

  onCancelar(): void {
    this.router.navigateByUrl('/miPerfil-user');
  }
}
