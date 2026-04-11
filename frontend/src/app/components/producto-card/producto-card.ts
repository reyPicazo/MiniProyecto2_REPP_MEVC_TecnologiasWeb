import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-card',
  standalone:true,
  imports: [CurrencyPipe, NgIf, CommonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {
  @Input()producto:any;

  @Output()alAgregarCarrito=new EventEmitter<any>();
  @Output()alComprar=new EventEmitter<any>();

  constructor(private router: Router) { }

  

  agregarCarrito(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if(!usuario.nombre){
      alert('Debes iniciar sesión para agregar productos al carrito.');
    } else {
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      const productoExistente = carrito.find((item: any) => item.productoid === this.producto.id);
      if(productoExistente){
        productoExistente.cantidad++;
      }
      else{
        carrito.push({ productoid: this.producto.id, cantidad: 1 });
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert(`Producto ${this.producto.nombre} agregado al carrito!`);
    }
  }

  comprar(){
    this.alComprar.emit(this.producto);
  }

  verDetalle(){
    this.router.navigate(['/productos', this.producto.id]);
  }



}
