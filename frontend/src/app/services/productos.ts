import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of}from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class Productos {
  private apiUrl='http://localhost:3000/api/productos'

  private productoProvicion=[
    {
      id: 1,
      nombre: 'tupulainas',
      categoria: 'tupulainas',
      marca: 'tupulainas',
      precio: 15000,
      stock: 10,
      imagen: '1.jpg',
      descripcion: 'tupulainas',
      disponibilidad: true
    },
    {
      id: 2,
      nombre: 'tupulainas',
      categoria: 'tupulainas',
      marca: 'tupulainas',
      precio: 350,
      stock: 25,
      imagen: '1.jpg',
      descripcion: 'tupulainas',
      disponibilidad: true
    },
    {
      id: 3,
      nombre: 'tupulainas',
      categoria: 'tupulainas',
      marca: 'tupulainas',
      precio: 1200,
      stock: 0,
      imagen: '1.jpg',
      descripcion: 'tupulainas',
      disponibilidad: false
    }
  ];

  constructor(private http: HttpClient) { }

  getProductos(){
    return of(this.productoProvicion)
  }

  /*Cuando la api funcione se cambiará a:
  getproductos(){
    return this.http.get<any[]>(this.apiUrl)
  }

  */
}
