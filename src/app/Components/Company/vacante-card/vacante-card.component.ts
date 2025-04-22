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

  @Input() miVacante!: VacanteResponse;

  autenticado(): boolean{
    return this.authService.isAuthenticated();

  }

}
