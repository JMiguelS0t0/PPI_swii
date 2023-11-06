import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiService } from '../../services/api.service';

@Component({
  selector: 'app-ent-catalogo',
  templateUrl: './ent-catalogo.component.html',
  styleUrls: ['./ent-catalogo.component.css'],
})
export class EntCatalogoComponent implements OnInit {
  public catalogo: any;

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
          const catalogoId = +idParam;
          if (!isNaN(catalogoId)) {
            this.getCatalogo(catalogoId);
          }
        }
      }
    });

    console.log(this.catalogo);
  }

  getCatalogo(id: number) {
    this.apiService.getCatalogoById(id).subscribe((catalogo) => {
      this.catalogo = catalogo;
    });
  }
}
