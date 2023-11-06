import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class homeComponent {
  constructor(private router: Router) {}
  routerPag(url: string): void {
    this.router.navigate([url]);
  }
}
