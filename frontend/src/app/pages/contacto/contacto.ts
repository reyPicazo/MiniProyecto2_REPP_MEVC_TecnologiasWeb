import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensajes } from '../../services/mensajes';
import { Alert } from '../../components/alert/alert';
import { NgIf, NgClass, NgStyle } from '@angular/common';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-contacto',
  imports: [Navbar, ReactiveFormsModule, Alert, NgIf, NgClass, NgStyle, Footer],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  contactoForm!: FormGroup;
  

  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  constructor(private mensajesService: Mensajes, private fb: FormBuilder) {
    this.contactoForm=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(2)]],
      email:['', [Validators.required, Validators.email]],
      asunto:['', [Validators.required]],
      mensaje:['', [Validators.required]]
    })
  }

  mostrarAlerta(tipo: 'success' | 'error', mensaje: string) {
    this.tipoAlert = tipo;
    this.mensajeAlert = mensaje;
    this.mostrarAlert = true;
  }
  enviarMSG(){
    const usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
    if(!usuario.nombre){
      this.mostrarAlerta('error', 'Debes iniciar sesión para enviar un mensaje.');
      return;
    }

    if(this.contactoForm.invalid){
      this.mostrarAlerta('error', 'Por favor, completa todos los campos correctamente.');
    }

    this.mensajesService.enviarMensaje(this.contactoForm.value).subscribe({
      next:()=>{
        this.mostrarAlerta('success', 'Mensaje enviado correctamente.');
        this.contactoForm.reset();
      },
      error:()=>{
        this.mostrarAlerta('error', 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      }
    });

    
  }
}
