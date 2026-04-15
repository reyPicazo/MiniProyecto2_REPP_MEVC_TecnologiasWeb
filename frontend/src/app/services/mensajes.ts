import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Mensajes {

  private apiURL='http://localhost:3000/mensajes'

  constructor(private http: HttpClient) {}

  enviarMensaje(data:any) {
    const usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
    const headers=new HttpHeaders({
      'Content-type': 'application/json',
      'x-user': usuario.nombre || ''
    })
    
    return this.http.post(this.apiURL, data, { headers });
  }
  
}
