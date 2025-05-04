import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-mi-perfil-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-perfil-user.component.html',
  styleUrl: './mi-perfil-user.component.css'
})
export class MiPerfilUserComponent {

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
