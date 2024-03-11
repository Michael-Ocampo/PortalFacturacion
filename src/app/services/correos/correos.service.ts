import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  


@Injectable({
  providedIn: 'root'
})
export class CorreosService {
  Url :string;  
  //token : string;  
  header : any;
  constructor(private http : HttpClient) {   
    
    //  this.Url = 'http://localhost:52624/api/Correos/';  
    //this.Url = 'https://SRV20-WEB.cmoderna.com/API_FacturacionQA/api/Correos/';  
    this.Url = 'https://SRV20-WEB.cmoderna.com/API_Facturacion/api/Correos/';  
    var User = JSON.parse(sessionStorage.getItem("Usuario")!);
    
    const headerSettings: {[name: string]: string | string[]; } = {};  
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

  GetByClienteAndEmisor(Cliente: string, RFCCliente: string, Emisor: String){
    var endpoint = this.Url + 'GetByClienteAndEmisor';
    var param = "?Cliente=" + Cliente + "&RFCCliente=" + RFCCliente + "&Emisor=" + Emisor;

    return this.http.get<any>(endpoint + param, {headers: this.header})
  }

  UpdateCorreo(Correo: any){
    var endpoint = this.Url + 'Update'

    return this.http.post<any>(endpoint,Correo,{ headers: this.header});
  }

  DeleteCorreo(Correo: any){
    var endpoint = this.Url + 'Delete'

    return this.http.post<any>(endpoint,Correo,{ headers: this.header});
  }
}
