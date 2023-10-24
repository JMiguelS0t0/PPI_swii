import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios-prestados',
  templateUrl: './servicios-prestados.component.html',
  styleUrls: ['./servicios-prestados.component.css'],
})
export class ServiciosPrestadosComponent {
  servicios = [
    {
      image: '../../assets/img/Decoracion.jpeg',
      descripcion:
        'Proin tempor ipsum eu nisi condimentum lacinia. Proin id urna nisl. Vivamus pulvinar mollis orci, amattis lacus suscipit et. Donec nisi dui, tempor vel mauris malesuada, laoreet hendrerit urna. Proin tempor ipsum eu nisi condimentum lacinia. Proin id urna nisl. Vivamus pulvinar mollis orci, a  mattis lacus suscipit et. Donec nisi dui, tempor vel mauris malesuada, laoreet hendrerit urna.',
    },
    {
      image: '../../assets/img/Decoracion.jpeg',
      descripcion:
        'Proin tempor ipsum eu nisi condimentum lacinia. Proin id urna nisl. Vivamus pulvinar mollis orci, amattis lacus suscipit et. Donec nisi dui, tempor vel mauris malesuada, laoreet hendrerit urna. Proin tempor ipsum eu nisi condimentum lacinia. Proin id urna nisl. Vivamus pulvinar mollis orci, a  mattis lacus suscipit et. Donec nisi dui, tempor vel mauris malesuada, laoreet hendrerit urna.',
    },
  ];
}
