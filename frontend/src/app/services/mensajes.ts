import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Mensajes {

  private apiURL='http://localhost:3000/mensajes'

  constructor(private http: HttpClient) {}

  enviarMensaje(usuario:string, nombre:string, email:string, asunto:string, mensaje:string) {
    const headers={
      'x-user': usuario || ''
    };
    const body={nombre, email, asunto, mensaje};
    return this.http.post(this.apiURL, body, { headers });
  }
  
}
