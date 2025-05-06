import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../Services/usuario.service';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  modelForm!: FormGroup;
  private emailParam!: string;
  private userService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Valores exactos de rol que espera el backend */
  public roles = [
    { value: 'CLIENTE',    label: 'Usuario' },
    { value: 'EMPRESA', label: 'Empresa' },
    { value: 'ADMON',   label: 'Administrador' }
  ];

  ngOnInit(): void {
    // 1) Inicializar formulario
    this.modelForm = new FormGroup({
      email:         new FormControl('', [Validators.required, Validators.email]),
      nombre:        new FormControl('', [Validators.required]),
      apellidos:     new FormControl('', [Validators.required]),
      rol:           new FormControl('', [Validators.required]),
      fechaRegistro: new FormControl('', [Validators.required])
    });

    // 2) Leer parámetro de ruta y cargar usuario
    this.route.paramMap.subscribe(params => {
      const email = params.get('_email');
      if (!email) {
        console.warn('No se encontró parámetro _email en la ruta');
        return;
      }
      this.emailParam = email;

      this.userService.findbyEmail(this.emailParam).subscribe({
        next: (u: UsuarioResponse) => {
          console.log('ROL desde el backend:', JSON.stringify(u.rol));
          console.log('Valores disponibles:', this.roles.map(r => JSON.stringify(r.value)));

          this.modelForm.patchValue({
            email:         u.email,
            nombre:        u.nombre,
            apellidos:     u.apellidos,
            rol:           u.rol,
            fechaRegistro: this.formatDate(u.fechaRegistro)
          });
        },
        error: err => {
          console.error('Error cargando usuario:', err);
        }
      });
    });
  }

  onSubmit(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const raw = this.modelForm.value;
    const dto = {
      nombre:    raw.nombre,
      apellidos: raw.apellidos,
      rol:       raw.rol,
      enabled:   1,        // forzamos enabled = 1
      password:  undefined
    };

    this.userService.updateUsuario(this.emailParam, dto).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Usuario actualizado!',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/usuarios/lista']);
          }
        });
      },
      error: err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el usuario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error actualizando usuario:', err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/usuarios/lista']);
  }

  private formatDate(input: string | Date): string {
    const d = new Date(input);
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, '0');
    const dd   = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
