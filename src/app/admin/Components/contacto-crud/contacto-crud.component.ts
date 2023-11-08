import { Component, OnInit } from '@angular/core';
import { contactoService } from 'src/app/services/contacto.service';
import { Router } from '@angular/router';
import { LenghtService } from 'src/app/services/lenght.service';

@Component({
  selector: 'app-contacto-crud',
  templateUrl: './contacto-crud.component.html',
  styleUrls: ['./contacto-crud.component.css'],
})
export class ContactoCrudComponent implements OnInit {
  public listacontacto: any[] = [];

  constructor(
    private contactoService: contactoService,
    public LenghtService: LenghtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContacto();
  }

  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  // CONTACTO
  getContacto() {
    this.contactoService.getContacto().subscribe((contacto) => {
      this.listacontacto = contacto;
    });
  }

  deleteContacto(Id: number) {
    this.ocultarContacto();
    this.contactoService.deleteContacto(Id);
    setTimeout(() => {
      this.getContacto();
    }, 900);
  }

  public btnContacto: boolean = false;
  mostrarContacto() {
    this.btnContacto = true;
  }

  ocultarContacto() {
    this.btnContacto = false;
  }
}
