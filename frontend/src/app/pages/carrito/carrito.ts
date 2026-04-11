import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [Navbar, NgIf, NgFor, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit{
  productosCarrito: { producto: any, cantidad: number }[] = [];

  constructor(private productosService: Productos, private cdr: ChangeDetectorRef) {}
  
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
    this.productosCarrito[index].cantidad++;
    this.guardarCarrito();
  }

  bajarCantidad(index: number) {
    if (this.productosCarrito[index].cantidad > 1) {
      this.productosCarrito[index].cantidad--;
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

}
