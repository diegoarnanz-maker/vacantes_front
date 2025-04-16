import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-navbar-compartido',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-compartido.component.html',
  styleUrl: './navbar-compartido.component.css'
})
export class NavbarCompartidoComponent {


  authService = inject(AuthService);
  router = inject(Router);
  
  rolUsuario: string | null ;

  constructor() {
    this.rolUsuario = null;
  }

  
  

  ngOnInit(): void {
      // Verificamos si el usuario está autenticado y obtenemos su rol al iniciar el componente
      if (this.authService.isAuthenticated()) {
        this.rolUsuario = this.authService.obtenerRol();
      }
  }
  
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);

  }

   autenticado(): boolean{
    return this.authService.isAuthenticated();

  }

// Es precios volver a obtener el rol ya que al iniciar el componente navbar-compartido este siempre será null
  segunRol(): string {
    this.rolUsuario = this.authService.obtenerRol();
    
    if (this.rolUsuario === "EMPRESA") {
      return "navbar2";
    }
    if (this.rolUsuario === "ADMON") {
      return "navbar3";
    }
    
    return "navbar1";
  }
  


}
