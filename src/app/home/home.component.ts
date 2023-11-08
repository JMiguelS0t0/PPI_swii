import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contactoService } from '../services/contacto.service';
import { ContactoModel } from '../models/contacto.model';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class homeComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private contactoService: contactoService
  ) {}
  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {}

  insertContactoForm = this.formBuilder.group({
    Id: [''],
    nombre: ['', []],
    correo: ['', []],
    mensaje: ['', []],
    telefono: ['', []],
  });

  showError = false;
  public listacontacto: any = [];

  insertContacto() {
    if (this.insertContactoForm.valid) {
      this.contactoService
        .createContact(
          this.insertContactoForm.value as unknown as ContactoModel
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.insertContactoForm.reset();
              this.successA();
              this.toastr.success('Se envió correctamente');
            } else {
              this.showError = true;
            }
          },
        });
    } else {
      this.insertContactoForm.markAllAsTouched();
    }
    console.log(this.insertContactoForm.value);
  }

  get nombre() {
    return this.insertContactoForm.controls.nombre;
  }

  get correo() {
    return this.insertContactoForm.controls.correo;
  }

  get mensaje() {
    return this.insertContactoForm.controls.mensaje;
  }

  get telefono() {
    return this.insertContactoForm.controls.telefono;
  }

  public successAnuncio: boolean = false;

  successA() {
    return (this.successAnuncio = true);
  }
}
