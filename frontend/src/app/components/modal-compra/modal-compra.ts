import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-modal-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Alert],
  templateUrl: './modal-compra.html',
  styleUrl: './modal-compra.css',
})
export class ModalCompra {

  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<void>();

  banco = '';
  tarjeta = '';
  vencimiento = '';
  cvv = '';


  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  mostrarAlerta(tipo: 'success' | 'error', mensaje: string) {
    this.tipoAlert = tipo;
    this.mensajeAlert = mensaje;
    this.mostrarAlert = true;
  }

  cerrarModal(){
    this.cerrar.emit();
  }

  comprar(){
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const datos = {
      banco: this.banco,
      tarjeta: this.tarjeta,
      vencimiento: this.vencimiento,
      cvv: this.cvv,
      carrito: carrito
    };

      this.http.post('http://localhost:3000/compra', datos).subscribe({
        next:(res:any) =>{
          this.mostrarAlerta('success', 'Compra realizada con éxito');
          setTimeout(() => {
          this.confirmar.emit();
        }, 2000);
        },
        error: (err) =>{
          this.mostrarAlerta('error', err.error.message || 'Error al realizar la compra');
        }
      });
  }


  constructor(private http: HttpClient) {}

}
