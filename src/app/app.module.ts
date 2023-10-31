import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from './shared/shared.module';
import { ServiciosPrestadosComponent } from './servicios-prestados/servicios-prestados.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { EntCatalogoComponent } from './ent-catalogo/ent-catalogo.component';
import { EntServiciosComponent } from './ent-servicios/ent-servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ServiciosPrestadosComponent,
    CatalogoComponent,
    EntServiciosComponent,
    EntCatalogoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
