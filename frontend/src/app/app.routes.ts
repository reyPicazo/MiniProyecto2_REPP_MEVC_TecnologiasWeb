import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { Carrito } from './pages/carrito/carrito';
import { Contacto } from './pages/contacto/contacto';
import { InicioAdmin } from './pages/inicio-admin/inicio-admin';
import { ActualizarProducto } from './pages/actualizar-producto/actualizar-producto';
import { SubirProducto } from './pages/subir-producto/subir-producto';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio},
    {path: 'productos/:id', component: ProductoDetalle},
    {path: 'contacto', component: Contacto},
    {path: 'carrito', component: Carrito},
    {path: 'admin', component: InicioAdmin},
    {path: 'actualizar-producto/:id', component: ActualizarProducto},
    {path: 'subir-producto', component: SubirProducto}
];
