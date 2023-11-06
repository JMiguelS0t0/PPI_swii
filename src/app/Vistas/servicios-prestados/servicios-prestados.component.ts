import { Component } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios-prestados',
  templateUrl: './servicios-prestados.component.html',
  styleUrls: ['./servicios-prestados.component.css'],
})
export class ServiciosPrestadosComponent {
  public listaservicios: any = [];

  constructor(private apiService: apiService, private router: Router) {}

  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.getServicios();
  }

  getServicios() {
    this.apiService.getServicios().subscribe((servicios) => {
      console.log(servicios);
      this.listaservicios = servicios;
    });
  }
}
