import { Component, inject } from '@angular/core';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';
import { AuthService } from '../../../Services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mi-perfil-company',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-perfil-company.component.html',
  styleUrl: './mi-perfil-company.component.css'
})
export class MiPerfilCompanyComponent {

  private authService = inject(AuthService);

  usuario!: UsuarioResponse;
  isLoading = true;
  errorMensaje = '';

  ngOnInit(): void {
    this.authService.getUserProfile2().subscribe({
      next: profile => {
        this.usuario = profile;
        this.isLoading = false;
      },
      error: err => {
        this.errorMensaje = 'No se pudo cargar el perfil de empresa';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
