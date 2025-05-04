import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router} from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoginResponse } from '../../Models/Responses/login-response';
import { LoginRequest } from '../../Models/Responses/login-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private authService = inject(AuthService);
  private router = inject(Router);

  FormLogin: FormGroup;

  constructor() {
    this.FormLogin = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null,[Validators.required])
    },[]);
  
}

  //SI al cargar el componente login se detecta que el usuario está eutenticado se redirige a la página correspondiente según su rol.
  ngOnInit() {
    
    if (this.authService.obtenerRol()==='CLIENTE'){
      this.router.navigate(['home']);
    }

    if (this.authService.obtenerRol() === 'EMPRESA') {
      this.router.navigate(['vacantes-company']);
    }

    if (this.authService.obtenerRol() === 'ADMON') {
      this.router.navigate(['admin-home']);
    }

  }
  
  getLogin() {
  const loginUser: LoginRequest = this.FormLogin.value as LoginRequest;

  this.authService.login(loginUser).subscribe({
    next: (response: LoginResponse) => {
      // Redirige según rol
      if (response.rol === 'CLIENTE') {
        this.router.navigate(['home']);
      } else if (response.rol === 'EMPRESA') {
        this.router.navigate(['vacantes-company']);
      } else if (response.rol === 'ADMON') {
        this.router.navigate(['admin-home']);
      }
    },
    error: () => {
      Swal.fire({
        title: 'Credenciales incorrectas',
        text: 'Por favor, verifica usuario y contraseña.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      this.FormLogin.reset();
    }
  });
}
  
 checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.FormLogin.get(formControlName)?.hasError(validador) && this.FormLogin.get(formControlName)?.touched
  }


}

 