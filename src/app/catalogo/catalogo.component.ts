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
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, fugit aliquid eius voluptatem explicabo soluta rerum debitis, reprehenderit a, obcaecati cumque culpa officia. Placeat, delectus natus. Voluptate mollitia ipsa illo.',
      items: [
        'Decoración de Mesas al Gusto: Personalizamos las mesas de acuerdo con tu visión y preferencias, asegurándonos de que cada detalle refleje la elegancia que deseas.',
        'Fotografía y Videografía Profesional: Un equipo de expertos capturará cada momento especial de tu evento, garantizando recuerdos duraderos.',
        'Coordinación de Eventos: Nuestro experimentado equipo de planificación se encargará de la logística y la coordinación para que puedas relajarte y disfrutar del día',
      ],
      image: '../../assets/img/Decoracion.jpeg',
    },
  ];
}
