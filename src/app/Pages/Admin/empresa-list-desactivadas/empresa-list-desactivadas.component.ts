import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../../Services/empresa.service';
import { Router, RouterLink } from '@angular/router';
import { EmpresaResponse } from '../../../Models/Responses/empresa-response';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-list-desactivadas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empresa-list-desactivadas.component.html',
  styleUrl: './empresa-list-desactivadas.component.css',
})
export class EmpresaListDesactivadasComponent {
  private empresaService = inject(EmpresaService);
  private router = inject(Router);

  empresasDesactivadas: EmpresaResponse[] = [];

  ngOnInit(): void {
    this.empresaService.findDesactivadas().subscribe({
      next: (data) => {
        this.empresasDesactivadas = data;
      },
      error: (err) => {
        console.error('Error al cargar empresas desactivadas', err);
      },
    });
  }

  activarEmpresa(id: number): void {
    this.empresaService.activarEmpresa(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Empresa activada',
          text: 'La empresa ha sido activada correctamente.',
          timer: 2000,
          showConfirmButton: false,
        });
        this.empresasDesactivadas = this.empresasDesactivadas.filter(
          (emp) => emp.idEmpresa !== id
        );
      },
      error: (err) => {
        console.error('Error al activar la empresa', err);
        Swal.fire('Error', 'No se pudo activar la empresa', 'error');
      },
    });
  }

  volver(): void {
    this.router.navigate(['/empresas']);
  }
}
