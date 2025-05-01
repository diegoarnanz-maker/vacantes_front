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
import { CategoriaFormComponent } from './Pages/Admin/categoria-form/categoria-form.component';
import { VacanteDetailCompanyComponent } from './Pages/Company/vacante-detail-company/vacante-detail-company.component';
import { VacanteFormComponent } from './Pages/Company/vacante-form/vacante-form.component';
import { SolicitudFormComponent } from './Pages/User/solicitud-form/solicitud-form.component';
import { VacanteDetailPublicComponent } from './Pages/vacante-detail-public/vacante-detail-public.component';
import { SolicitudDetailCompanyComponent } from './Pages/Company/solicitud-detail-company/solicitud-detail-company.component';
import { SolicitudDetailUserComponent } from './Pages/User/solicitud-detail-user/solicitud-detail-user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },
    { path: '', component: PublicHomeComponent },
    { path: 'home', component: PublicHomeComponent },
    { path: 'vacante-details/public/:idVacante', component: VacanteDetailPublicComponent },

    //Flujo Usuario Cliente
    { path: 'solicitudes-user', component: SolicitudListUserComponent, canActivate: [authGuard] },
    { path: 'solicitud-form/user/:idVacante', component: SolicitudFormComponent, canActivate:[authGuard] },
    { path: 'solicitud-user/detail/:idSolicitud', component: SolicitudDetailUserComponent, canActivate:[authGuard] },

    { path: 'miPerfil-user', component: MiPerfilUserComponent, canActivate: [authGuard] },
    
    //Flujo Usuario Empresa
    { path: 'vacantes-company', component: VacanteListCompanyComponent, canActivate:[companyGuard] }, //Es el home de la empresa
    { path: 'miPerfil-company', component: MiPerfilCompanyComponent, canActivate:[companyGuard] },

    { path: 'vacante-details/company/:idVacante', component: VacanteDetailCompanyComponent, canActivate:[companyGuard] },
    { path: 'vacante-form/company/:idVacante', component: VacanteFormComponent, canActivate: [companyGuard] }, //Para editar vacante existente
    { path: 'vacante-form/company', component: VacanteFormComponent, canActivate: [companyGuard] },//para crear nueva vacante
    
    { path: 'solicitudes-company/:idVacante', component: SolicitudListCompanyComponent, canActivate: [companyGuard] }, //Lista de solicitudes de la vacante seleccionada
    { path: 'solicitud-company/detail/:idSolicitud', component: SolicitudDetailCompanyComponent, canActivate: [companyGuard] },

    //Flujo Usuario Admin

    { path: 'admin-home', component: DashboardComponent, canActivate:[adminGuard] },
    { path: 'categorias', component: CategoriaListComponent, canActivate:[adminGuard]  },
    { path: 'empresas', component: EmpresaListComponent, canActivate:[adminGuard]  },
    { path: 'usuarios', component: UsuariosDashboardComponent, canActivate:[adminGuard]  },
    { path: 'miPerfil-admin', component: MiPerfilAdminComponent, canActivate:[adminGuard]  }, 
    
    { path: 'categorias/form', component: CategoriaFormComponent, canActivate:[adminGuard]  }, //Para crear nueva categoría
    { path: 'categorias/form/:idCategoria', component: CategoriaFormComponent, canActivate:[adminGuard]  }, //Para editar categoría existente

  


  { path: '**', component: PublicHomeComponent }
    




];




/**   

  // **Panel de Administración**
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },*/