import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { Carrito } from './pages/carrito/carrito';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio},
    {path: 'productos/:id', component: ProductoDetalle},
    {path: 'contacto', component: Contacto},
    {path: 'carrito', component: Carrito},
];
