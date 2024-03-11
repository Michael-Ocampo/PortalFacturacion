import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { firstNameAndLastname } from '../validaciones/validaciones.component'


@Component({
  selector: 'usuario-list',
  templateUrl: './usuario.list.html'

})

export class UsuarioList{

public newUsers: FormControl = new FormControl();
public newUsersNom: FormControl = new FormControl();
public newUsersRol: FormControl = new FormControl();
public newUsersEmail: FormControl = new FormControl();
public newUsersPass: FormControl = new FormControl();
public newUsersConPass: FormControl = new FormControl();
public newUsersRFC: FormControl = new FormControl();



Tabla = 'false'
  MostrarTabla(){
    this.Tabla = 'true';
  }

  BtnCancelar(){
    this.myForm.reset();
    this.Tabla ='false';
  }

  public myForm: FormGroup = this.fb.group({
    idUsuario: ['', [Validators.required]],
    nombre: ['', [Validators.required, Validators.pattern(firstNameAndLastname)]],
    rol: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
    RFC: ['', [Validators.required]],
    // idUsuario: new FormControl('', Validators.minLength(3)),
    // nombre: new FormControl('', Validators.required),
    // rol: new FormControl('', Validators.required),
    // email: new FormControl('', Validators.email),
    // password: new FormControl('',Validators.minLength(8)),
    // passwordConfirm: new FormControl('',Validators.minLength(8)),
    // RFC: new FormControl('', Validators.required),
  });


  constructor( public fb: FormBuilder){}



  onAddUsuarios(): void{
    if(this.newUsers.invalid) return;
     this.newUsers = this.myForm.get('idUsuario') as FormControl;
     this.newUsersNom = this.myForm.get('nombre') as FormControl;
     this.newUsersRol = this.myForm.get('rol') as FormControl;
     this.newUsersEmail = this.myForm.get('email') as FormControl;
     this.newUsersPass = this.myForm.get('password') as FormControl;
     this.newUsersConPass = this.myForm.get('passwordConfirm') as FormControl;
     this.newUsersRFC = this.myForm.get('RFC') as FormControl;
     console.log(this.newUsers);

  }

  MensajeExito(){
    alert("Usuario Agregado con Exito");
  }


  onSubmit(): void{

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    // console.log(this.myForm.value);
    // (this.myForm.controls['NewUsuarios'] as FormArray) = this.Users.array([]);
    // this.myForm.reset();

    // if(this.myForm.value.RFC == ""){
    //   alert("El RFC es requerido");
    //   return;
    // }

    // if(this.myForm.value.password == ""){
    //   alert("La contraseña es requerida");
    //   return;
    // }

    // if(this.myForm.value.nombre == ""){
    //   alert("El nombre es requerido");
    //   return;
    // }

    // if(this.myForm.value.idUsuario == ""){
    //   alert("El usuario es requerido");
    //   return;
    // }

    // if(this.myForm.value.email == ""){
    //   alert("El email es requerido");
    //   return;
    // }

    // if(this.myForm.value.rol == ""){
    //   alert("Seleccione un rol");
    //   return;
    // }

    // if(this.myForm.value.nombre.length < 3){
    //   alert("El nombre debe tener al menos 3 caracteres");
    //   return;
    // }

    // if(this.myForm.value.idUsuario.length < 3){
    //   alert("El usuario debe tener al menos 3 caracteres");
    //   return;
    // }

    // if(this.myForm.value.password.length < 8){
    //   alert("La contraseña debe tener al menos 8 caracteres");
    //   return;
    // }
    // if(this.myForm.value.passwordConfirm.length < 8){
    //   alert("La contraseña debe tener al menos 8 caracteres");
    //   return;
    // }

    // if(this.myForm.value.password != this.myForm.value.passwordConfirm){
    //   alert("Las contraseñas no coinciden");
    //   return;
    // }

     //this.myForm.reset();

    console.log(this.myForm.value);
  }
}
