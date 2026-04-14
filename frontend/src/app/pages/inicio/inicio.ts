import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NgFor} from '@angular/common'
import { Navbar } from '../../components/navbar/navbar';
import {Productos}from '../../services/productos';
import { ProductoCard } from "../../components/producto-card/producto-card";
import { CommonModule } from '@angular/common';
import { Alert } from '../../components/alert/alert';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar, ProductoCard, NgFor, CommonModule, Alert],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit{
  productos: any[] = [];

  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  constructor(private productosService: Productos, private cdr: ChangeDetectorRef) {}

  mostrarAlerta(tipo: 'success' | 'error', mensaje: string) {
    this.tipoAlert = tipo;
    this.mensajeAlert = mensaje;
    this.mostrarAlert = true;
  }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: data => {
        
        this.productos = [...data];
        this.cdr.detectChanges();
      },
      error: err => {
        console.error("ERROR:", err);
      }
    });
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
