import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
import { UsuarioResponse } from '../../../Models/Responses/usuario-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  userService = inject(UsuarioService);
  arrUsers! : UsuarioResponse[];
  router = inject(Router);

  ngOnInit() {
    this.userService.findAll().subscribe((response: any) => {
      this.arrUsers = response;
    });
  }
}
