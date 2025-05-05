import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mi-perfil-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-perfil-admin.component.html',
  styleUrl: './mi-perfil-admin.component.css'
})
export class MiPerfilAdminComponent {
 private authService = inject(AuthService);

  usuario!: UsuarioResponse;
  
  isLoading: boolean;
  errorMensaje: string;
  filtroNombre: string;

  constructor() {

    this.errorMensaje = '';
    this.filtroNombre = '';
    this.isLoading = true;
  }
  ngOnInit(): void {
    this.authService.getUserProfile2().subscribe({
      next: profile => {
        this.usuario = profile;
        this.isLoading = false;
      },
      error: err => {
        this.errorMensaje = 'No se pudo cargar el perfil';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
