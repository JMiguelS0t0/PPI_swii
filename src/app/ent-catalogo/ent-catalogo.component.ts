import { Component } from '@angular/core';

@Component({
  selector: 'app-ent-catalogo',
  templateUrl: './ent-catalogo.component.html',
  styleUrls: ['./ent-catalogo.component.css'],
})
export class EntCatalogoComponent {
  items = [
    'Decoración de Mesas al Gusto: Personalizamos las mesas de acuerdo con tu visión y preferencias, asegurándonos de que cada detalle refleje la elegancia que deseas.',
    'Fotografía y Videografía Profesional: Un equipo de expertos capturará cada momento especial de tu evento, garantizando recuerdos duraderos.',
    'Coordinación de Eventos: Nuestro experimentado equipo de planificación se encargará de la logística y la coordinación para que puedas relajarte y disfrutar del día',
  ];
}
