import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { Producto } from '../../models/producto';
import { DecimalPipe, NgIf } from '@angular/common';   

@Component({
  selector: 'app-producto-detalle',
  standalone:true,
  imports: [Navbar, DecimalPipe, NgIf],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  producto!:Producto;
  precio:number=0;
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  constructor(private route: ActivatedRoute, private productosService: Productos, private cdr: ChangeDetectorRef) {}


  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
    this.productosService.getById(Number(id)).subscribe((producto) => {
      this.producto = producto;
      this.cdr.detectChanges();
    });
  }

  agregarCarrito(){

    if(!this.usuario.nombre){
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
}
