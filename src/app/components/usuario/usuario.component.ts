import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { CharacterUsuarios } from '../usuario/interface/interface.usuario';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
//Michael

@Input()
public CharacterList: CharacterUsuarios[]= [{

  idUsuario: 'Admin',
  NomUsuario: 'Michael',
  Rol: 'Andministrador',
  Correo: 'michael@correo.com',
  IdContrasena: 'admin12345',
  ConfContrasena: 'admin12345',
  RFCCompania: 'PALM'
}];



 Tabla = 'false';
public AddInfFormulario(IdUsuario: HTMLInputElement, NomUsuaario: HTMLInputElement, Rol:HTMLInputElement,Correo:HTMLInputElement,IdContrasena:HTMLInputElement,IdConfContrasena:HTMLInputElement, RFCCIA:HTMLSelectElement ){
  console.log('Adding...', IdUsuario.value, NomUsuaario.value, Rol.value, Correo.value,IdContrasena.value, IdConfContrasena.value, RFCCIA.value)
}
MostrarTabla(){
  this.Tabla = 'true';
}

BtnCancelar(){
  this.Tabla ='false';
}




  usuarios: any[] = [];
  Usuario: any;
  errorMessage:string;
  page = 1;
  pageSize = 10;
  previous: any;

  constructor(private fb: FormBuilder, private router:Router, private route: ActivatedRoute,private UsuariosService:UsuariosService) {
    this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
    this.usuarios = [];
    this.errorMessage = "";
  }

  ngOnInit(): void {
  }

  getUsuarios(){

    this.UsuariosService.GetUsuarios().subscribe(
      data=>{
        if(data.length > 0)
        {
          this.usuarios = data;
        }
        else
        {
          this.errorMessage = data.ID;
        }
      },
      error => {
        switch(error.error) {
          case "TokenInvalido": {
            sessionStorage.removeItem('Usuario');
            sessionStorage.clear();
            this.Usuario = null;
            alert("La sesion expiró");
            window.location.href ='/login';
            // this.router.navigate(['/login']);
             break;
          }
          case "SinPermisoEmisor": {
            alert("Usted no tiene permisos para el RFC Emisor seleccionado!");
             break;
          }
          default: {
             //statements;
             break;
          }
      }
    });
  }

}
