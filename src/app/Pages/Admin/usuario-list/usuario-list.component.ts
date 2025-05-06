import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
volverPatras() {
  this.router.navigate(['/usuarios/lista']);
}

  userService = inject(UsuarioService);
  arrUsers! : UsuarioResponse[];
  router = inject(Router);
  desactivar(email: string): void {
    this.userService.desactivarUsuario(email)
      .subscribe({
        next: res => {
          console.log('Usuario desactivado:', res);

          const usr = this.arrUsers.find(u => u.email === email);
          if (usr) {
            usr.enabled = 0;
          }
        },
        error: err => {
          console.error('Error al desactivar usuario:', err);

        }
      });
  }

  activar(email: string): void {
    this.userService.activarUsuario(email)
      .subscribe({
        next: res => {
          console.log('Usuario activado:', res);

          const usr = this.arrUsers.find(u => u.email === email);
          if (usr) {
            usr.enabled = 1;
          }
        },
        error: err => {
          console.error('Error al activar usuario:', err);

        }
      });
  }
  ngOnInit() {
    this.userService.findAll().subscribe((response: any) => {
      this.arrUsers = response;
    });
  }
}
