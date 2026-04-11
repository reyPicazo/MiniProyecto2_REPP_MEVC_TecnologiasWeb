import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: Inicio},
    {path: 'productos/:id', component: ProductoDetalle}
];
