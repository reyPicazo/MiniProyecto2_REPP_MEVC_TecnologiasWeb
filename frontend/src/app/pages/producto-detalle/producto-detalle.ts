import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { Producto } from '../../models/producto';
import { DecimalPipe, NgIf, NgClass, NgStyle } from '@angular/common';   
import { Alert } from '../../components/alert/alert';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-producto-detalle',
  standalone:true,
  imports: [Navbar, DecimalPipe, NgIf, NgClass, NgStyle, Alert, Footer],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  producto!:Producto;
  precio:number=0;
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  constructor(private route: ActivatedRoute, private productosService: Productos, private cdr: ChangeDetectorRef) {}

  mostrarAlerta(tipo: 'success' | 'error', mensaje: string) {
    this.tipoAlert = tipo;
    this.mensajeAlert = mensaje;
    this.mostrarAlert = true;
  }

  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
    this.productosService.getById(Number(id)).subscribe((producto) => {
      this.producto = producto;
      this.cdr.detectChanges();
    });
  }

  agregarCarrito(){

    if(!this.usuario.nombre){
      this.mostrarAlerta('error', 'Debes iniciar sesión para agregar productos al carrito.');
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
      this.mostrarAlerta('success', `Producto ${this.producto.nombre} agregado al carrito.`);
    }
  }
}
