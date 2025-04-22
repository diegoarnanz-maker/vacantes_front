import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { RegisterRequest } from '../../Models/Responses/register-request';
import { IUsuario } from '../../Models/Interfaces/iusuario';
import { RegisterResponse } from '../../Models/Responses/register-response';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  registroFrom: FormGroup;

  constructor() { 
    this.registroFrom = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      apellidos: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/), Validators.maxLength(45)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),Validators.maxLength(100)])
    }, []);
  }



  getRegister() {
    const registerUser: RegisterRequest = this.registroFrom.value as RegisterRequest;

    this.authService.registro(registerUser).subscribe({
      next: (response: RegisterResponse) => {
        this.router.navigate(['login'])
        alert('Inicia sesión');
      },
      error: (error) => {
         
        alert("Credenciales incorrectas");
        this.registroFrom.reset();
      }
    });
    
  }



  //Para las validaciones:
  checkControl(formControlName:string, validator:string):boolean | undefined {
    return this.registroFrom.get(formControlName)?.hasError(validator) && this.registroFrom.get(formControlName)?.touched;
  }

}
