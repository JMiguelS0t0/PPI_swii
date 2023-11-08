import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { CrudComponent } from './admin/crud/crud.component';
import { vistasModule } from './Vistas/vistas.module';
import { LoginComponent } from './admin/login/login.component';
import { homeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, CrudComponent, LoginComponent, homeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    vistasModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
