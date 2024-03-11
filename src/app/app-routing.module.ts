import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TimbradoComponent } from './components/timbrado/timbrado.component';
import { CorreosClientesComponent } from './components/correos-clientes/correos-clientes.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'timbrado', component: TimbradoComponent },
  { path: 'correosclientes', component: CorreosClientesComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }