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
    this.alAgregarCarrito.emit(this.producto);
  }

  comprar(){
    this.alComprar.emit(this.producto);
  }

  verDetalle(){
    this.router.navigate(['/productos', this.producto.id]);
  }



}
