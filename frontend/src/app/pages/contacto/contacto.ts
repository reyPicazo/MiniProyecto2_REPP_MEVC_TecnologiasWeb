import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { Mensajes } from '../../services/mensajes';

@Component({
  selector: 'app-contacto',
  imports: [Navbar, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  nombre:string="";
  email:string="";
  mensaje:string="";
  asunto:string="";

  constructor(private mensajesService: Mensajes) {}
  enviarMSG(){
    const usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
    if(!usuario.nombre){
      alert('Debes iniciar sesión para enviar un mensaje.');
      return;
    }else{
      this.mensajesService.enviarMensaje(usuario.nombre, this.nombre, this.email, this.asunto, this.mensaje).subscribe({
        next:() => {alert('Mensaje enviado correctamente.');
          this.nombre = '';
          this.email = '';
          this.asunto = '';
          this.mensaje = '';
        },
        error:() => {alert('Error al enviar el mensaje.');}
      })

    }
  }
}
