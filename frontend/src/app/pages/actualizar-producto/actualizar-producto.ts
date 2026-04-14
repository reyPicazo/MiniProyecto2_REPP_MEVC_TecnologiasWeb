import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Productos } from '../../services/productos';
import { Navbar } from '../../components/navbar/navbar';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Alert } from '../../components/alert/alert';

@Component({
  selector: 'app-actualizar-producto',
  standalone:true,
  imports: [Navbar, CurrencyPipe, NgFor, NgIf, FormsModule, Alert],
  templateUrl: './actualizar-producto.html',
  styleUrl: './actualizar-producto.css',
})
export class ActualizarProducto implements OnInit{
  producto: any={};
  mostrarConfirmacion: boolean = false;
  passwordAdmin: string = '';
  errorAdmin: string = '';
  imagenFile: File | null= null;
  imagenPreview: string | null = null;

  mostrarAlert = false;
  tipoAlert: 'success' | 'error' = 'success';
  mensajeAlert = '';

  constructor(private route: ActivatedRoute, private productosService: Productos, private cdr: ChangeDetectorRef, private router: Router){}

  mostrarAlerta(tipo: 'success' | 'error', mensaje: string) {
    this.tipoAlert = tipo;
    this.mensajeAlert = mensaje;
    this.mostrarAlert = true;
  }
  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    if(id){
      this.productosService.getById(parseInt(id)).subscribe((data) => {
        this.producto= data;
        this.cdr.detectChanges();
      });
    }
  }

  onImageChange(event: any) {
    this.imagenFile = event.target.files[0];
    if (this.imagenFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.imagenFile);
    }
  }

  actualizar(){
    
    this.productosService.updateProduct(this.producto.id, this.producto, this.imagenFile || undefined).subscribe({
      next:()=>{
        this.mostrarAlerta('success', 'Producto actualizado correctamente');
        setTimeout(() => this.router.navigate(['/admin']), 2000);
      },
      error: () => this.mostrarAlerta('error', 'Error al actualizar el producto')
    });
  }

  eliminar(){
    this.mostrarConfirmacion=true;
    
  }

  confirmarEliminar(){
    if(this.passwordAdmin==='admin' || this.passwordAdmin==='ADMIN' || this.passwordAdmin==='Admin'){
      this.productosService.deleteProducto(this.producto.id).subscribe({
        next:()=> {
          this.mostrarAlerta('success', 'Producto eliminado correctamente');
          setTimeout(() => this.router.navigate(['/admin']), 1500);
        },
        error: () => this.mostrarAlerta('error', 'Error al eliminar el producto')
      });
    }else{
      this.errorAdmin="Contraseña de administrador incorrecta";
    }
  }

  cancelarEliminar(){
    this.mostrarConfirmacion=false;
    this.passwordAdmin='';
    this.errorAdmin='';
  }

  descartar(){
    this.router.navigate(['/admin']);
  }
}


