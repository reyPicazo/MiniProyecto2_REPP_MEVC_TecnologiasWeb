import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ModalCompra } from '../../components/modal-compra/modal-compra';
import { Alert } from "../../components/alert/alert";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [Navbar, NgIf, NgFor, CurrencyPipe, ModalCompra, Alert],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit{
  productosCarrito: { producto: any, cantidad: number }[] = [];
  cantidad:number=0;

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
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    carrito.forEach((item: any) => {
      this.productosService.getById(item.productoid).subscribe((producto) => {
        this.productosCarrito.push({ producto, cantidad: item.cantidad }); 
        this.cdr.detectChanges();
      });
    });
  }

  agregarCantidad(index: number){
    const item = this.productosCarrito[index];

    if (item.cantidad >= item.producto.stock) {
      this.mostrarAlerta('error', 'Has agotado todo el stock disponible');
      return;
    }

    item.cantidad++;

    this.guardarCarrito();
    
  }

  bajarCantidad(index: number) {
    const item = this.productosCarrito[index];
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.productosCarrito.splice(index, 1);
    }
    this.guardarCarrito();
    
  }

  guardarCarrito() {
    const carrito = this.productosCarrito.map(item => ({
      productoid: item.producto.id,
      cantidad: item.cantidad
    }));
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  getTotal() {
    return this.productosCarrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  modalAbierto = false;

  finalizarCompra() {
    this.mostrarAlerta('success', 'Compra finalizada con éxito');
    this.modalAbierto = false;
    this.productosCarrito = [];
    localStorage.removeItem('carrito');
  }

}
