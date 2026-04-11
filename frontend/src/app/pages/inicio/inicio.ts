import { Component, OnInit } from '@angular/core';
import {NgFor} from '@angular/common'
import { Navbar } from '../../components/navbar/navbar';
import {Productos}from '../../services/productos';
import { ProductoCard } from "../../components/producto-card/producto-card";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar, ProductoCard, NgFor],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit{
  productos: any[] = [];

  constructor(private productosService: Productos) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data=>{
      this.productos=data;
    })
  }

  onAgregarCarrito(producto: any){
    //implementar métodos para agregar al carrito
    console.log('Agregar al carrito:', producto);
  }

  onComprar(producto: any){
    //implementar métodos para comprar
    console.log('Comprar:', producto);
  }
}
