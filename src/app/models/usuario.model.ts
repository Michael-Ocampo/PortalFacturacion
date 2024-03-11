import { CommonModule } from "@angular/common";
import { NgModel } from "@angular/forms";
import { Role } from "./role.model";
import { NgModule } from "@angular/core";


export class Usuario {
    Correo: String;
    ID: String;
    Nombre: String;
    Username: String;
    Role: Role;

    constructor()
    {
        this.Correo = "";
        this.ID = "";
        this.Nombre = "";
        this.Username = "";
        this.Role = new Role();
     }
}

//Michael

export interface AgregarUsuario{
  idUsuario: string;
  NombreUsuario: string;
  Rol: Role;
  Correo: string;
}
