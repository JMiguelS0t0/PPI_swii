import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {

  constructor(

    private router: Router
  ) {}

  ngOnInit(): void {}

  routerPag(url: string): void {
    this.router.navigate([url]);
  }
}
