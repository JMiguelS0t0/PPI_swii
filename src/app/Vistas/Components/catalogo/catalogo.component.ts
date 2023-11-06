import { Component, OnInit } from '@angular/core';
import { apiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { LenghtService } from '../../../services/lenght.service';

@NgModule({
  declarations: [],
  providers: [LenghtService],
})
export class VistasModule {}
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  public listacatalogo: any = [];

  constructor(
    public LenghtService: LenghtService,
    private apiService: apiService,
    private router: Router
  ) {}

  routerPag(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.getCatalogo();
  }

  getCatalogo() {
    this.apiService.getCatalogo().subscribe((catalogo) => {
      console.log(catalogo);
      this.listacatalogo = catalogo;
    });
  }
}
