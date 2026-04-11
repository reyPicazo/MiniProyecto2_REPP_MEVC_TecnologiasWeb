import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioModel } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.Default,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  Usuario: UsuarioModel | undefined;
  nombre: string='';
  id:number=0;
  iniciarSesion: boolean=false;
  error:string='';
  textBoton:string="Iniciar Sesion";

  constructor(private usuarioService: UsuarioService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      this.Usuario = JSON.parse(stored);
      this.textBoton="Cerrar Sesion";
    }
  }

  logIn(){
    this.iniciarSesion=true;
    this.error = '';   // ← limpiar error anterior
    this.nombre = '';  // ← limpiar input anterior
    this.changeDetectorRef.detectChanges();
  }

  guardarSesion(){
    if(this.nombre){
      this.Usuario=this.usuarioService.crearUsuario(this.nombre!);
      localStorage.setItem('usuario', JSON.stringify(this.Usuario));
      this.iniciarSesion=false;
      this.nombre='';
      this.textBoton="Cerrar Sesion";
      console.log('Usuario guardado:', this.Usuario);
      console.log('Texto botón:', this.textBoton);
      
      this.changeDetectorRef.detectChanges();
      
    }else{
      this.error='Por favor, ingrese un nombre.';
    }
    

  }

  verificarSesion() {
    if (this.Usuario) {
      this.logOut();
    } else {
      this.logIn();
    }
  }

  logOut(){
    
    localStorage.clear();
    this.Usuario = undefined;
    this.textBoton="Iniciar Sesion";
    
    this.changeDetectorRef.detectChanges();
    this.router.navigate(['/inicio']);

  }
  
  

  



}
