import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'PortalFacturacion';
  Usuario: any;
  sidebarExpanded = true;
  showSidebar = false;
  constructor(private router:Router)
  {
    this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
  }

  ngOnInit() {    
    if(this.Usuario == null)  
    {
      this.router.navigate(['/login']);   
    }
    else{
      this.router.navigate(['/inicio']);   
    }
  }

  logOut(){
    this.Usuario = null;  
    this.router.navigate(['/Portal_Facturas/login']);   
    sessionStorage.removeItem('Usuario');    
    sessionStorage.clear();  
  }
}
