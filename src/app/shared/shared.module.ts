import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [NavComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NavComponent, FooterComponent],
})
export class SharedModule {}
