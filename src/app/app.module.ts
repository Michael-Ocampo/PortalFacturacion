import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { CorreosClientesComponent } from './components/correos-clientes/correos-clientes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TimbradoComponent } from './components/timbrado/timbrado.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioList } from './components/usuario/ListUsuarios/usuario.list';
import { ValidacionesComponent } from './components/usuario/validaciones/validaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CorreosClientesComponent,
    NavbarComponent,
    TimbradoComponent,
    UsuarioComponent,
    UsuarioList,
    ValidacionesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule,
    FormsModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
