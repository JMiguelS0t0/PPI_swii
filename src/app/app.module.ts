import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';

// const APP_ROUTES: Routes = [
//   {
//     path: 'Inicio',
//     loadChildren: () =>
//       import('./inicio/inicio.module').then((m) => m.InicioModule),
//   },
//   {
//     path: '**',
//     pathMatch: 'full',
//     redirectTo: 'inicio',
//   },
// ];
@NgModule({
  declarations: [AppComponent, InicioComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
