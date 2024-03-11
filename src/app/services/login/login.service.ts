import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable, BehaviorSubject } from 'rxjs';  
import { Router } from '@angular/router'; 
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url :string;  
  //token : string;  
  header : any;
  errorMessage:string; 
  Usuario: Observable<Usuario>;
  UsuarioLoged : any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private permisoCorreos: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user = new Usuario();

  constructor(private http : HttpClient,private router:Router) {   

    // this.Url = 'http://localhost:52624/';  
    this.Url = 'https://SRV20-WEB.cmoderna.com/API_FacturacionQA/';  
    //this.Url = 'https://SRV20-WEB.cmoderna.com/API_Facturacion/';  

    this.Url = this.Url + 'api/login/'
    this.Usuario =  new BehaviorSubject<Usuario>(this.user);
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  


    this.errorMessage = "";
  }  

  Login(LoginRequest : any){  
    

     var a =this.Url+'authenticate';  
     this.http.post<any>(this.Url+'authenticate',LoginRequest,{ headers: this.header}).subscribe(
      data => {          
        if(data.ID > 0)    
        {       
          //debugger
          sessionStorage.setItem("Usuario", JSON.stringify(data));
          this.Usuario = JSON.parse(JSON.stringify(data)!);
          this.loggedIn.next(true);
          
          this.UsuarioLoged = JSON.parse(JSON.stringify(data)!);
          var rolId;
          if(this.Usuario != null){
            rolId = this.UsuarioLoged.Role.Id;
            if(Number(rolId) >0 &&  Number(rolId) <=3){
              this.permisoCorreos.next(true);
            }
          }
          
          this.Usuario = new BehaviorSubject<any>(JSON.stringify(data));
          this.router. navigate(['/inicio']);    
        }    
        else{    
          this.errorMessage = data.ID;    
        }    
      },    
      error => {    
        if(error.status == 401)
        {
          alert("Usuario y/o contraseña incorrectos");
        }
        this.errorMessage = error.ID;    
      }
     )
  }  
  get isLoggedIn() {
    
    this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);

    if(this.Usuario != null)
    {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  get UserLoggedIn() {
    
    this.UsuarioLoged = JSON.parse(sessionStorage.getItem("Usuario")!);
    
    if(this.UsuarioLoged != null)
    {
      this.user.Nombre = this.UsuarioLoged.Nombre;
      this.user.ID = this.UsuarioLoged.ID;
      this.user.Correo = this.UsuarioLoged.Correo;
      this.user.Username = this.UsuarioLoged.Username;
      this.user.Role = this.UsuarioLoged.Role;
    }
    return this.Usuario;

  }

  get hasPermisoCorreos() {
    
    this.UsuarioLoged = JSON.parse(sessionStorage.getItem("Usuario")!);
    var rolId;
    if(this.UsuarioLoged != null){
      rolId = this.UsuarioLoged.Role.Id;
      if(Number(rolId) >0 &&  Number(rolId) <=3){
        this.permisoCorreos.next(true);
      }
    }
    else{
      this.permisoCorreos.next(false);
    }
    return this.permisoCorreos.asObservable();
  }



}
