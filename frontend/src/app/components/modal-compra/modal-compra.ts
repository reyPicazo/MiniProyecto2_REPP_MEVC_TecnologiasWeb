import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
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

  cerrarModal(){
    this.cerrar.emit();
  }

  comprar(){
    const datos = {
      banco: this.banco,
      tarjeta: this.tarjeta,
      vencimiento: this.vencimiento,
      cvv: this.cvv
    }

      this.http.post('http://localhost:3000/compra', datos).subscribe({
        next:(res:any) =>{
          this.confirmar.emit();
        },
        error: (err) =>{
          console.error('Error en la compra:', err);
        }
      });
  }


  constructor(private http: HttpClient) {}

}
