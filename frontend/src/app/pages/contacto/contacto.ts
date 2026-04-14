import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { Mensajes } from '../../services/mensajes';
import { Alert } from '../../components/alert/alert';

@Component({
  selector: 'app-contacto',
  imports: [Navbar, FormsModule, Alert],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  nombre:string="";
  email:string="";
  mensaje:string="";
  asunto:string="";

  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  constructor(private mensajesService: Mensajes) {}

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
    }else{
      this.mensajesService.enviarMensaje(usuario.nombre, this.nombre, this.email, this.asunto, this.mensaje).subscribe({
        next:() => {
          this.mostrarAlerta('success', 'Mensaje enviado correctamente.');
          this.nombre = '';
          this.email = '';
          this.asunto = '';
          this.mensaje = '';
        },
        error: () => this.mostrarAlerta('error', 'Error al enviar el mensaje.')
      })

    }
  }
}
