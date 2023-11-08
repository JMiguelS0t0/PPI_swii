import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  public contacto: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ContactoServices: contactoService
  ) {}

  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params) {
        const idParam = params.get('id');
        if (idParam) {
          const contactoId = +idParam;
          if (!isNaN(contactoId)) {
            this.getContacto(contactoId);
          }
        }
      }
    });
  }

  getContacto(Id: number) {
    this.ContactoServices.getContactoById(Id).subscribe((contacto) => {
      this.contacto = contacto;
    });
  }
}
