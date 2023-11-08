import { NgModule } from '@angular/core';

import { ServiciosPrestadosComponent } from './Components/servicios-prestados/servicios-prestados.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { EntCatalogoComponent } from './Components/ent-catalogo/ent-catalogo.component';
import { EntServiciosComponent } from './Components/ent-servicios/ent-servicios.component';
import { ContactoComponent } from '../admin/Components/contacto/contacto.component';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ServiciosPrestadosComponent,
    CatalogoComponent,
    EntServiciosComponent,
    EntCatalogoComponent,
    ContactoComponent,
  ],

  imports: [CommonModule],
})
export class vistasModule {}
