import { NgModule } from '@angular/core';
import { ServiciosPrestadosComponent } from '../Vistas/servicios-prestados/servicios-prestados.component';
import { CatalogoComponent } from '../Vistas/catalogo/catalogo.component';
import { EntCatalogoComponent } from '../Vistas/ent-catalogo/ent-catalogo.component';
import { EntServiciosComponent } from '../Vistas/ent-servicios/ent-servicios.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ServiciosPrestadosComponent,
    CatalogoComponent,
    EntServiciosComponent,
    EntCatalogoComponent,
  ],

  imports: [CommonModule],
})
export class vistasModule {}
