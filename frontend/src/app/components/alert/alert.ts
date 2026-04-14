import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input() tipo: 'success' | 'error' = 'success';
  @Input() mensaje: string = '';
  @Output() cerrar = new EventEmitter<void>();
}
