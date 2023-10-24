import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ServiciosPrestadosComponent } from './servicios-prestados/servicios-prestados.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';

const APP_ROUTES: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'serviciosprestados',
    component: ServiciosPrestadosComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
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
