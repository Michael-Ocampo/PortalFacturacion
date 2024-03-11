import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturasService } from '../../services/facturas/facturas.service';   
import * as jQuery from 'jquery';
import {MdbTableDirective} from 'angular-bootstrap-md';



// declare var getPagination: any;
// declare function  startPag(totalRows :string): any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // @ViewChild(MdbTableDirective, { static: true })
  // mdbTable!: MdbTableDirective;
  
  formFiltros: FormGroup;
  errorMessage:string; 
  facturas: any[] = [];
  Usuario: any;
  searchText: string = '';
  page = 1;
  pageSize = 15;
  previous: any;
  
  sidebarExpanded = true;
  constructor(private fb: FormBuilder, private router:Router, private route: ActivatedRoute,private FacturasService:FacturasService) {
    var date = new Date();
    this.formFiltros = this.fb.group({
      TipoFecha: ['1'],
      RFCEmisor: [''],
      RFCReceptor: [''],
      TipoCFDI: ['A'],
      FechaInicio: [(new Date()).toISOString().substring(0,10)],
      FechaFin: [(new Date()).toISOString().substring(0,10)],
      Serie: [''],
      FolioInicio: [''],
      FolioFin: [''],
      UUID: ['', Validators.minLength(36)]
    });
    this.errorMessage = "";
    this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
    this.facturas = [];
    
  }

  ngOnInit(): void {

  }
  ngOnChanges(){

  }
 
  getFacturas(){
    this.facturas = [];
    // debugger;
    var TipoFecha = this.formFiltros.get('TipoFecha')?.value;
    var RFCEmisor = this.formFiltros.get('RFCEmisor')?.value;
    var RFCReceptor = this.formFiltros.get('RFCReceptor')?.value;
    var TipoCFDI = this.formFiltros.get('TipoCFDI')?.value;
    var FechaInicio = this.formFiltros.get('FechaInicio')?.value;
    var FechaFin = this.formFiltros.get('FechaFin')?.value;
    var Serie = this.formFiltros.get('Serie')?.value;
    var FolioInicio = this.formFiltros.get('FolioInicio')?.value;
    var FolioFin = this.formFiltros.get('FolioFin')?.value;
    var UUID = this.formFiltros.get('UUID')?.value;

    this.FacturasService.getFacturas(TipoFecha,FechaInicio,FechaFin,RFCEmisor,RFCReceptor,TipoCFDI,Serie,FolioInicio,FolioFin,UUID).subscribe(
      data => {   
        // debugger
        /*console.log(data); 
        console.log(data,length); 
        console.log(data); 
*/
        // debugger;    
        if(data.length > 0)    
        {       
          this.facturas = data; 
        }    
        else{    
          this.errorMessage = data.ID;    
        }    
      },    
      error => {            
        //debugger
        console.log(error); 
        switch(error.error) { 
          
          case "TokenInvalido": { 
            sessionStorage.removeItem('Usuario');    
            sessionStorage.clear();  
            this.Usuario = null;
            alert("La sesion expiró");
            window.location.href ='login';
            // this.router.navigate(['/login']);  
             break; 
          } 
          case "SinPermisoEmisor": { 
            alert("Usted no tiene permisos para el RFC Emisor seleccionado!");
             break; 
          } 
          default: { 
             //statements; 
             break; 
          } 
       } 
      });
      
  }
  
  getXML(v:any, Serie: any, Folio: any )
  {
    
    var hex = v.toString();//force conversion
    var str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
    // for (var i = 0; i < hex.length; i += 2)
    //     str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

    
    let filename = Serie + '-' + Folio + '.xml'; 
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(str));
    element.setAttribute('target', '_blank');
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

  }


  getPDF(PDF:any, Serie: any, Folio: any )
  {
    


    var bin = atob(PDF);
    console.log('File Size:', Math.round(bin.length / 1024), 'KB');

    // var obj = document.createElement('object');
    // obj.style.width = '100%';
    // obj.style.height = '842pt';
    // obj.type = 'application/pdf';
    // obj.data = 'data:application/pdf;base64,' + PDF;
    // document.body.appendChild(obj);

    // Insert a link that allows the user to download the PDF file
    var link = document.createElement('a');
    //link.innerHTML = 'Download PDF file';
    link.download = Serie + '-' + Folio + '.pdf';
    link.href = 'data:application/octet-stream;base64,' + PDF;
    document.body.appendChild(link);
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
     'cancelable': false
    });
    link.dispatchEvent(clickEvent);

   
  }

  logOut(){
    this.Usuario = null;  
    sessionStorage.removeItem('Usuario');    
    sessionStorage.clear();  
    window.location.href ='/login';
    // this.router.navigate(['/login']);   
    
  }

  limpiarFormulario(){
    this.formFiltros = this.fb.group({
      TipoFecha: ['1'],
      RFCEmisor: [''],
      RFCReceptor: [''],
      TipoCFDI: ['A'],
      FechaInicio: [(new Date()).toISOString().substring(0,10)],
      FechaFin: [(new Date()).toISOString().substring(0,10)],
      Serie: [''],
      FolioInicio: [''],
      FolioFin: [''],
      UUID: ['', Validators.minLength(36)]
    });

    this.facturas = [];
  }
}



