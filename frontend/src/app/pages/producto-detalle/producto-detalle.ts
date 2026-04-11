import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { Producto } from '../../models/producto';
import { DecimalPipe, CurrencyPipe, NgIf } from '@angular/common';   

@Component({
  selector: 'app-producto-detalle',
  standalone:true,
  imports: [Navbar, DecimalPipe, CurrencyPipe, NgIf],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  producto!:Producto;
  precio:number=0;

  constructor(private route: ActivatedRoute, private productosService: Productos, private cdr: ChangeDetectorRef) {}


  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
    this.productosService.getById(Number(id)).subscribe((producto) => {
      this.producto = producto;
      this.cdr.detectChanges();
    });
  }
}
