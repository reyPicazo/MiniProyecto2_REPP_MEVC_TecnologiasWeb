import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private contUsuarios=1;
  usuarios:UsuarioModel[]=[]
  private usuariosSubject=new BehaviorSubject <UsuarioModel | undefined>(undefined);

  constructor(){}

  crearUsuario( nombre:string):UsuarioModel|undefined{
    const Usuario={
      id: this.contUsuarios++,
      nombre
    }
    
    return Usuario;
  }

  

  
  


}
