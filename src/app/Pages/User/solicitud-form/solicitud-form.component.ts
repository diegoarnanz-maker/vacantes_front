import { Component, inject } from '@angular/core';
import { SolicitudService } from '../../../Services/solicitud.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacanteResponse } from '../../../Models/Responses/vacante-response';
import { VacanteService } from '../../../Services/vacante.service';
import { SolicitudRequest } from '../../../Models/Responses/solicitud-request';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css'
})
export class SolicitudFormComponent {

  private serviceSolicitud = inject(SolicitudService);

  private serviceVacante = inject(VacanteService);
  private rutaActiva = inject(ActivatedRoute);
  
  private router           = inject(Router);

  vacanteSelect!: VacanteResponse;

  formSolicitud: FormGroup;
  
  constructor() {
    const id = Number(this.rutaActiva.snapshot.paramMap.get('idVacante'));

    this.formSolicitud = new FormGroup({
      comentarios: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
      curriculum: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(45)]),
      archivo: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
      idVacante: new FormControl(id), //El valor por defecto es el id de la ruta.
    }, []);
  
  }

 ngOnInit() {   
      const id = Number(this.rutaActiva.snapshot.paramMap.get('idVacante'));
      
      this.serviceVacante.findByIdVacante(id).subscribe({
        next: (response: VacanteResponse) => {
          this.vacanteSelect = response;
        },
         error: (err) => {
            console.error('No se pudo cargar la vacante', err);
          }
      })
    }



  enviarSolicitud() {
    const solDataForm: SolicitudRequest = this.formSolicitud.value as SolicitudRequest;

    this.serviceSolicitud.createSolicitud(solDataForm).subscribe({
      next: () => {
        alert('Solicitud enviada');
        this.router.navigate(['/home'])
      },
        error: () => {
          alert('Error al enviar la solicitud');
          this.formSolicitud.reset();
        }
    })

  }
  
  checkControl(formControlName: string, validator: string): boolean| undefined {
    return this.formSolicitud.get(formControlName)?.hasError(validator) && this.formSolicitud.get(formControlName)?.touched;
  }


}

