import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DetalleServiciosComponent } from './detalle-servicios/detalle-servicios.component';

@NgModule({
  declarations: [
    DetalleServiciosComponent
  ],
  imports: [SharedModule],
})
export class ServiciosprestadosModule {}
