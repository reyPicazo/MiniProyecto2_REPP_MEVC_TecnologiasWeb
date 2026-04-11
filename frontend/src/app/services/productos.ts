  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import {of}from 'rxjs';
import { Producto } from '../models/producto';



  @Injectable({
    providedIn: 'root',
  })

  export class Productos {
    private apiUrl='http://localhost:3000/productos'

    

    constructor(private http: HttpClient) { }

    

    //Cuando la api funcione se cambiará a:
    getProductos(){
      return this.http.get<any[]>(this.apiUrl)
    }

    

    getById(id:number){
      return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }
  }
