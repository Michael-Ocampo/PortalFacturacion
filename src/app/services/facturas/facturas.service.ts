import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';  
import { FileToUpload } from 'src/app/components/timbrado/file-to-upload';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  Url :string;  
  //token : string;  
  header : any;
  constructor(private http : HttpClient) {   

    // this.Url = 'http://localhost:52624/api/Facturas/';  
    //this.Url = 'https://SRV20-WEB.cmoderna.com/API_FacturacionQA/api/Facturas/';  
    this.Url = 'https://SRV20-WEB.cmoderna.com/API_Facturacion/api/Facturas/';  
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
    console.log(headerOptions);
    this.header = headerOptions.headers;  
  }  

  getFacturas(TipoFecha : string, FechaInicio: string, FechaFin: string, RFCEmisor: string, RFCReceptor: string, TipoCFDI: string, Serie: string, FolioInicio: string, FolioFin: string, UUID: string){  
     //debugger;  
     
     var param = "?TipoFecha=" + TipoFecha + "&FechaInicio=" + FechaInicio +"&FechaFin=" + FechaFin +"&RFCEmisor=" + RFCEmisor +"&RFCReceptor=" + RFCReceptor +"&TipoCFDI=" + TipoCFDI +"&Serie=" + Serie +"&FolioInicio=" + FolioInicio +"&FolioFin=" + FolioFin +"&UUID=" + UUID
   return this.http.get<any>(this.Url +'GetFacturasByFiltro' + param,{ headers: this.header}); 
   //this.http.get('https://reqres.in/api/users?page=2'); 
  }  

  upload(file:FileToUpload) {
  
    // Create form data
    // const formData = new FormData(); 
      
    // // Store form name as "file" with file data
    // formData.append("file", file, file.name);
    //   console.log(formData);
    // // Make http post request over api
    // // with formData as req
    
    return this.http.post<any>(this.Url+'TimbrarFactura',file,{ headers: this.header});  
    
}
}
