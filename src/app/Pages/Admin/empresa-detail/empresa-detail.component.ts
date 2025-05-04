import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../../Services/empresa.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaResponse } from '../../../Models/Responses/empresa-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empresa-detail.component.html',
  styleUrl: './empresa-detail.component.css',
})
export class EmpresaDetailComponent {
  private empresaService = inject(EmpresaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  empresa?: EmpresaResponse;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idEmpresa'));
    this.empresaService.findById(id).subscribe({
      next: (data) => (this.empresa = data),
      error: (err) => console.error('Error al cargar la empresa', err),
    });
  }

  modificarEmpresa(): void {
    if (!this.empresa) return;
    this.router.navigate(['/empresas/form', this.empresa.idEmpresa]); // Asegúrate de tener esta ruta
  }

  desactivarEmpresa(): void {
    if (!this.empresa) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción desactivará la empresa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService
          .desactivarEmpresa(this.empresa!.idEmpresa)
          .subscribe({
            next: () => {
              Swal.fire(
                'Desactivada',
                'La empresa ha sido desactivada correctamente',
                'success'
              );
              this.router.navigate(['/empresas']);
            },
            error: () => {
              Swal.fire('Error', 'No se pudo desactivar la empresa', 'error');
            },
          });
      }
    });
  }
}
