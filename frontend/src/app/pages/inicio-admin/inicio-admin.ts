import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NgFor} from '@angular/common'
import { Navbar } from '../../components/navbar/navbar';
import {Productos}from '../../services/productos';
import { Admin } from '../../models/admin';
import { CommonModule } from '@angular/common';
import { AdminCard } from '../../components/admin-card/admin-card';

@Component({
  selector: 'app-inicio-admin',
  standalone:true,
  imports: [Navbar, CommonModule, AdminCard, NgFor],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css',
})
export class InicioAdmin implements OnInit {
   productos: any[] = [];

  constructor(private productosService: Productos, private cdr: ChangeDetectorRef) {}

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
  onActualizar(producto: any) {
    console.log('Actualizar producto:', producto);
    // aquí irá la lógica de actualizar después
  }
  

}
