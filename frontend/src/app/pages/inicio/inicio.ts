import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
