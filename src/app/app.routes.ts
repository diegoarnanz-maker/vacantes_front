import { Routes } from '@angular/router';

import { LoginComponent } from './Pages/login/login.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { PublicHomeComponent } from './Pages/public-home/public-home.component';
import { VacanteDetailPublicComponent } from './Pages/vacante-detail-public/vacante-detail-public.component';

import { SolicitudListUserComponent } from './Pages/User/solicitud-list-user/solicitud-list-user.component';
import { SolicitudFormComponent } from './Pages/User/solicitud-form/solicitud-form.component';
import { SolicitudDetailUserComponent } from './Pages/User/solicitud-detail-user/solicitud-detail-user.component';
import { MiPerfilUserComponent } from './Pages/User/mi-perfil-user/mi-perfil-user.component';
import { DatosFormUserComponent } from './Pages/User/datos-form-user/datos-form-user.component';

import { VacanteListCompanyComponent } from './Pages/Company/vacante-list-company/vacante-list-company.component';
import { VacanteDetailCompanyComponent } from './Pages/Company/vacante-detail-company/vacante-detail-company.component';
import { VacanteFormComponent } from './Pages/Company/vacante-form/vacante-form.component';
import { SolicitudListCompanyComponent } from './Pages/Company/solicitud-list-company/solicitud-list-company.component';
import { SolicitudDetailCompanyComponent } from './Pages/Company/solicitud-detail-company/solicitud-detail-company.component';
import { MiPerfilCompanyComponent } from './Pages/Company/mi-perfil-company/mi-perfil-company.component';
import { DatosFormCompanyComponent } from './Pages/Company/datos-form-company/datos-form-company.component';

import { DashboardComponent } from './Pages/Admin/dashboard/dashboard.component';
import { MiPerfilAdminComponent } from './Pages/Admin/mi-perfil-admin/mi-perfil-admin.component';
import { CategoriaListComponent } from './Pages/Admin/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './Pages/Admin/categoria-form/categoria-form.component';
import { EmpresaListComponent } from './Pages/Admin/empresa-list/empresa-list.component';
import { EmpresaDetailComponent } from './Pages/Admin/empresa-detail/empresa-detail.component';
import { EmpresaFormComponent } from './Pages/Admin/empresa-form/empresa-form.component';
import { EmpresaListDesactivadasComponent } from './Pages/Admin/empresa-list-desactivadas/empresa-list-desactivadas.component';
import { UsuarioListComponent } from './Pages/Admin/usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './Pages/Admin/usuario-edit/usuario-edit.component';
import { DatosFormAdminComponent } from './Pages/Admin/datos-form-admin/datos-form-admin.component';

import { authGuard } from './Security/Guards/auth.guard';
import { companyGuard } from './Security/Guards/company.guard';
import { adminGuard } from './Security/Guards/admin.guard';

export const routes: Routes = [
  // Público
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: '', component: PublicHomeComponent },
  { path: 'home', component: PublicHomeComponent },
  {
    path: 'vacante-details/public/:idVacante',
    component: VacanteDetailPublicComponent,
  },

  // Usuario Cliente
  {
    path: 'solicitudes-user',
    component: SolicitudListUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'solicitud-form/user/:idVacante',
    component: SolicitudFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'solicitud-user/detail/:idSolicitud',
    component: SolicitudDetailUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'miPerfil-user',
    component: MiPerfilUserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'DatosForm-user',
    component: DatosFormUserComponent,
    canActivate: [authGuard],
  },

  // Usuario Empresa
  {
    path: 'vacantes-company',
    component: VacanteListCompanyComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'vacante-details/company/:idVacante',
    component: VacanteDetailCompanyComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'vacante-form/company/:idVacante',
    component: VacanteFormComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'vacante-form/company',
    component: VacanteFormComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'solicitudes-company/:idVacante',
    component: SolicitudListCompanyComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'solicitud-company/detail/:idSolicitud',
    component: SolicitudDetailCompanyComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'miPerfil-company',
    component: MiPerfilCompanyComponent,
    canActivate: [companyGuard],
  },
  {
    path: 'DatosForm-company',
    component: DatosFormCompanyComponent,
    canActivate: [companyGuard],
  },

  // Usuario Administrador
  {
    path: 'admin-home',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'miPerfil-admin',
    component: MiPerfilAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'categorias',
    component: CategoriaListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'categorias/form',
    component: CategoriaFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'categorias/form/:idCategoria',
    component: CategoriaFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'empresas',
    component: EmpresaListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/empresa/:idEmpresa',
    component: EmpresaDetailComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'empresas/form',
    component: EmpresaFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'empresas/form/:idEmpresa',
    component: EmpresaFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'empresas/desactivadas',
    component: EmpresaListDesactivadasComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'DatosForm-admin',
    component: DatosFormAdminComponent,
    canActivate: [adminGuard],
  },
  { path: 'usuarios', redirectTo: 'usuarios/lista', pathMatch: 'full' },
  {
    path: 'usuarios/lista',
    component: UsuarioListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'usuarios/lista/:_email',
    component: UsuarioEditComponent,
    canActivate: [adminGuard],
  },


  // Wildcard
  { path: '**', component: PublicHomeComponent },
];
