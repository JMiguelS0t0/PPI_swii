import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ServiciosPrestadosComponent } from './servicios-prestados/servicios-prestados.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { EntServiciosComponent } from './ent-servicios/ent-servicios.component';
import { EntCatalogoComponent } from './ent-catalogo/ent-catalogo.component';

const APP_ROUTES: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'servicioprestado',
    component: ServiciosPrestadosComponent,
  },
  {
    path: 'servicio',
    component: EntServiciosComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'entcatalogo',
    component: EntCatalogoComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ServiciosPrestadosComponent,
    CatalogoComponent,
    EntServiciosComponent,
    EntCatalogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
