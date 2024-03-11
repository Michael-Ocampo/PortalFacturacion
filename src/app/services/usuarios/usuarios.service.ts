import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { AgregarUsuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  Url : string;
  header : any;


  constructor(private http : HttpClient) {
    var User = JSON.parse(sessionStorage.getItem("Usuario")!);

    // this.Url = 'http://localhost:52624/';
    //this.Url = 'https://SRV20-WEB.cmoderna.com/API_FacturacionQA/';
    this.Url = 'https://SRV20-WEB.cmoderna.com/API_Facturacion/';

    this.Url = this.Url + 'api/Usuario/';

    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  'Bearer ' + User.Token,
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'*',
          'Access-Control-Allow-Methods':'*'
      })
    };
    this.header = headerOptions.headers;
  }

  Get(Username : String){
    var endpoint = this.Url + 'GetByUsername';
    var param = "?Username=" + Username;

    return this.http.get<any>(endpoint + param, {headers: this.header})
  }

  GetUsuarios(){
    var endpoint = this.Url + 'GetUsuarios';
    var param = "";

    return this.http.get<any>(endpoint + param, {headers: this.header})
  }
}
