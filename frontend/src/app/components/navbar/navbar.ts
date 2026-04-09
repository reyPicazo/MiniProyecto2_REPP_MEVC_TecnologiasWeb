import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioModel } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  Usuario: UsuarioModel | undefined;
  nombre: string | undefined;
  id:number=0;
  iniciarSesion: boolean=false;
  error:string='';

  constructor(private usuarioService: UsuarioService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.Usuario = JSON.parse(stored);
    }
  }

  logIn(){
    this.iniciarSesion=true;
  }

  guardarSesion(){
    if(this.nombre){
      this.Usuario=this.usuarioService.crearUsuario(this.nombre!);
      localStorage.setItem('usuario', JSON.stringify(this.Usuario));
      this.iniciarSesion=false;
    }else{
      this.error='Por favor, ingrese un nombre.';
    }
    

  }

  logOut(){
    localStorage.removeItem('usuario');
    this.Usuario = undefined;
    this.changeDetectorRef.detectChanges();
  }
  
  get textoBoton(): string {
    return this.Usuario ? 'Cerrar Sesion' : 'Iniciar Sesion';
  }



}
