import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiService } from '../../services/api.service';

@Component({
  selector: 'app-ent-servicios',
  templateUrl: './ent-servicios.component.html',
  styleUrls: ['./ent-servicios.component.css'],
})
export class EntServiciosComponent {
  public servicio: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: apiService,
    private router: Router
  ) {}

  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params) {
        const idParam = params.get('id');
        if (idParam) {
          const servicioId = +idParam;
          if (!isNaN(servicioId)) {
            this.getCatalogo(servicioId);
          }
        }
      }
    });

    console.log(this.servicio);
  }

  getCatalogo(id: number) {
    this.apiService.getServicioById(id).subscribe((servicio) => {
      this.servicio = servicio;
    });
  }
}
