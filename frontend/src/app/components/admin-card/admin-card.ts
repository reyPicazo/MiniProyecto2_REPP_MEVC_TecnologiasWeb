import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-card',
  standalone:true,
  imports: [CurrencyPipe],
  templateUrl: './admin-card.html',
  styleUrl: './admin-card.css',
})
export class AdminCard {
  @Input() producto:any;
  @Output() alActualizar=new EventEmitter<any>();

  constructor(private router: Router) {}

  actualizar(){
    console.log(this.producto.id);
    this.router.navigate(['/actualizar-producto', this.producto.id]);
  }
}
