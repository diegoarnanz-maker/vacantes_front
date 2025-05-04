import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../Services/empresa.service';
import { EmpresaResponse } from '../../../Models/Responses/empresa-response';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css',
})
export class EmpresaListComponent {
  private empresaService = inject(EmpresaService);
  private router = inject(Router);

  empresas: EmpresaResponse[] = [];

  ngOnInit(): void {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.error('Error al cargar las empresas', err);
      },
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/admin/empresa', id]);
  }

  desactivarEmpresa(idEmpresa: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción desactivará la empresa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.desactivarEmpresa(idEmpresa).subscribe({
          next: () => {
            Swal.fire(
              'Desactivada',
              'La empresa ha sido desactivada correctamente',
              'success'
            );
            this.ngOnInit(); // Recargar listado
          },
          error: () => {
            Swal.fire('Error', 'No se pudo desactivar la empresa', 'error');
          },
        });
      }
    });
  }

  verDesactivadas(): void {
    this.router.navigate(['/empresas/desactivadas']);
  }
}
