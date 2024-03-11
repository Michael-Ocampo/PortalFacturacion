import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs'; 
import { LoginService } from '../../../services/login/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { data } from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user = new  Usuario();

  UserDefault: string;
  
  Usuario$: Observable<Usuario>;
  claseSidebar: string = "";
  claseContent: string = "page-content p-5";
  isLoggedIn$: Observable<boolean>;
  hasPermisoCorreos$: Observable<boolean>
  

  _usuario: any;
  constructor( private loginService: LoginService) { 
    this.UserDefault = '{"Correo": "","ID": "0","Nombre": " prueb","Password": "","Permisos_Emisor": "","Permisos_Receptor": "","Permisos_Serie": "", "Role": {"Id": "", "Role": ""},"Token": "","Username": "",}';;
    //this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
    this.user.Nombre = "";
    this.user.ID = "";
    this.user.Correo = "";
    this.user.Username = "";

    
    this.Usuario$ = new BehaviorSubject<Usuario>(this.user);
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.hasPermisoCorreos$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    
    this.Usuario$ = this.loginService.UserLoggedIn;
    this.hasPermisoCorreos$ = this.loginService.hasPermisoCorreos;
    this.isLoggedIn$ = this.loginService.isLoggedIn;    
  }

  ngOnChanges() {
    //this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
  }
  ngAfterContentInit(){
    
    
  }

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
 

  logOut(){
    this.Usuario$ = new BehaviorSubject<any>(JSON.stringify(this.UserDefault));;  
    sessionStorage.removeItem('Usuario');    
    sessionStorage.clear();  
    window.location.href ='login';
    
    // this.router.navigate(['/login']);   
    
  }
  togg(){
    console.log("asasasasas");
    this.claseSidebar = "vertical-nav sidebar active";
    this.claseContent = "page-content p-5 active";
  }

  getUser(data: any){
    console.log(data);
  }
}
