import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';   
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  formLogin: FormGroup;
  errorMessage:string; 
  Usuario:any;
  showSidebar = false;
  constructor(private fb: FormBuilder, private router:Router,private LoginService:LoginService) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorMessage = "";
    sessionStorage.removeItem('Usuario');    

    sessionStorage.clear();    
    if(this.router.url == "/login")
    {
      this.showSidebar = false;
    }
    console.log(this.router.url);
  }

  ngOnInit() {    
    
    // console.log("Llego desde login constructorlogin");
    sessionStorage.removeItem('Usuario');    
    sessionStorage.clear();    
  }    


  doLogin(){
    sessionStorage.removeItem('Usuario');    
    sessionStorage.clear();  
    //debugger;
    const login: any = {
      Username: this.formLogin.get('usuario')?.value,
      Password: this.formLogin.get('password')?.value,
    };
    this.LoginService.Login(login);
    // this.LoginService.Login(login).subscribe(    
    //   data => {          
    //     if(data.ID > 0)    
    //     {       
    //       sessionStorage.setItem("Usuario", JSON.stringify(data));
    //       this.Usuario = JSON.parse(JSON.stringify(data)!);
    //       this.loggedIn.next(true);
    //       this.router.navigate(['/inicio']);    
    //     }    
    //     else{    
    //       this.errorMessage = data.ID;    
    //     }    
    //   },    
    //   error => {    
    //     if(error.status == 401)
    //     {
    //       alert("Usuario y/o contraseña incorrectos");
    //     }
    //     this.errorMessage = error.ID;    
    //   });    

    // Aqui consumiria la API para Login
    this.formLogin.reset();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
