import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VacanteResponse } from '../../../Models/Responses/vacante-response';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-vacante-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vacante-card.component.html',
  styleUrl: './vacante-card.component.css'
})
export class VacanteCardComponent {
  
  private authService = inject(AuthService);

  public rolUsuario: string | null;
  
  constructor() {
    this.rolUsuario = null;
  }

  @Input() miVacante!: VacanteResponse;

  ngOnInit(): void{
    if (this.authService.isAuthenticated()) {
      this.rolUsuario = this.authService.obtenerRol();
    }
  }
  
  autenticado(): boolean{
    return this.authService.isAuthenticated();

  }

}
