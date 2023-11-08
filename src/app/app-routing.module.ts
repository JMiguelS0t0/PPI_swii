import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guards';

import { homeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { CrudComponent } from './admin/crud/crud.component';
import { CatalogoComponent } from './Vistas/Components/catalogo/catalogo.component';
import { EntServiciosComponent } from './Vistas/Components/ent-servicios/ent-servicios.component';
import { ServiciosPrestadosComponent } from './Vistas/Components/servicios-prestados/servicios-prestados.component';
import { EntCatalogoComponent } from './Vistas/Components/ent-catalogo/ent-catalogo.component';
import { ContactoComponent } from './admin/Components/contacto/contacto.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: homeComponent,
  },
  {
    path: 'servicioprestado',
    component: ServiciosPrestadosComponent,
  },
  {
    path: 'servicio/:id',
    component: EntServiciosComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'entcatalogo/:id',
    component: EntCatalogoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: CrudComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contacto/:id',
    component: ContactoComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
