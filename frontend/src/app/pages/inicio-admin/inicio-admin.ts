import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NgFor} from '@angular/common'
import { Navbar } from '../../components/navbar/navbar';
import {Productos}from '../../services/productos';
import { Admin } from '../../models/admin';
import { CommonModule } from '@angular/common';
import { AdminCard } from '../../components/admin-card/admin-card';
import { Alert } from '../../components/alert/alert';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-inicio-admin',
  standalone:true,
  imports: [Navbar, CommonModule, AdminCard, NgFor, Alert, Footer],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css',
})
export class InicioAdmin implements OnInit {
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
  onActualizar(producto: any) {
    console.log('Actualizar producto:', producto);
  }
  

}
