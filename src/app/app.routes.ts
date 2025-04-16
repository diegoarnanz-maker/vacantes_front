import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PublicHomeComponent } from './Pages/public-home/public-home.component';
import { SolicitudListUserComponent } from './Pages/User/solicitud-list-user/solicitud-list-user.component';
import { MiPerfilUserComponent } from './Pages/User/mi-perfil-user/mi-perfil-user.component';
import { VacanteListCompanyComponent } from './Pages/Company/vacante-list-company/vacante-list-company.component';
import { DashboardComponent } from './Pages/Admin/dashboard/dashboard.component';
import { authGuard } from './Security/Guards/auth.guard';
import { MiPerfilCompanyComponent } from './Pages/Company/mi-perfil-company/mi-perfil-company.component';
import { MiPerfilAdminComponent } from './Pages/Admin/mi-perfil-admin/mi-perfil-admin.component';
import { SolicitudListCompanyComponent } from './Pages/Company/solicitud-list-company/solicitud-list-company.component';
import { CategoriaListComponent } from './Pages/Admin/categoria-list/categoria-list.component';
import { EmpresaListComponent } from './Pages/Admin/empresa-list/empresa-list.component';
import { UsuariosDashboardComponent } from './Pages/Admin/usuarios-dashboard/usuarios-dashboard.component';
import { companyGuard } from './Security/Guards/company.guard';
import { adminGuard } from './Security/Guards/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },
    { path: '', component: PublicHomeComponent },
    { path: 'home', component: PublicHomeComponent },

    //Flujo Usuario Cliente
    { path: 'solicitudes-user', component: SolicitudListUserComponent, canActivate:[authGuard] },
    { path: 'miPerfil-user', component: MiPerfilUserComponent, canActivate:[authGuard] },
    //Estos guards redirigirán al usuario no autenticado cuando este clique en mis solicitudes o mi perfil.


    //Flujo Usuario Empresa
    { path: 'vacantes-company', component: VacanteListCompanyComponent, canActivate:[companyGuard] },
    { path: 'miPerfil-company', component: MiPerfilCompanyComponent, canActivate:[companyGuard] },
    { path: 'solicitudes-company', component: SolicitudListCompanyComponent, canActivate:[companyGuard] },

    
    //Flujo Usuario Admin

    { path: 'admin-home', component: DashboardComponent, canActivate:[adminGuard] },
    { path: 'categorias', component: CategoriaListComponent, canActivate:[adminGuard]  },
    { path: 'empresas', component: EmpresaListComponent, canActivate:[adminGuard]  },
    { path: 'usuarios', component: UsuariosDashboardComponent, canActivate:[adminGuard]  },
    { path: 'miPerfil-admin', component: MiPerfilAdminComponent, canActivate:[adminGuard]  }, //Redirigir a mi perfil user?? para no duplicar??
      



    { path: '**', component: PublicHomeComponent }
];



/**   

  // **Panel de Administración**
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },*/