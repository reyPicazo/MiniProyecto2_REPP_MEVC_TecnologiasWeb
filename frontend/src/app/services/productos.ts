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

    addProducto(producto: Producto, imagen?:File) {
      const formData=new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('categoria', producto.categoria);
      formData.append('marca', producto.marca);
      formData.append('precio', producto.precio.toString());
      formData.append('stock', producto.stock.toString());
      formData.append('descripcion', producto.descripcion);
      formData.append('disponibilidad', producto.disponibilidad.toString());

      if(imagen){
        formData.append('imagen', imagen);
      }
      return this.http.post(this.apiUrl, formData);
    }

    updateProduct(id: number, producto: Producto, imagen?:File) {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('categoria', producto.categoria);
      formData.append('marca', producto.marca);
      formData.append('precio', producto.precio.toString());
      formData.append('stock', producto.stock.toString());
      formData.append('descripcion', producto.descripcion);
      formData.append('disponibilidad', producto.disponibilidad.toString());

      if(imagen){
        formData.append('imagen', imagen);
      }
      return this.http.put(`${this.apiUrl}/${id}`, formData);
    }

    deleteProducto(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
  }
