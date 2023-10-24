import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent {
  paquetes = [
    {
      title: 'Paquete #1',
      description: 'Descripción del paquete #1',
      image: '../../assets/img/Decoracion.jpeg',
    },
    {
      title: 'Paquete #2',
      description: 'Descripción del paquete #2',
      image: '../../assets/img/Decoracion.jpeg',
    },
    {
      title: 'Paquete #3',
      description: 'Descripción del paquete #3',
      image: '../../assets/img/Decoracion.jpeg',
    },
  ];
}
