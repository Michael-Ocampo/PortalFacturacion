import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { CorreosService } from 'src/app/services/correos/correos.service';
import { tick } from '@angular/core/testing';

let correoEdit: any = [];

@Component({
  selector: 'app-correos-clientes',
  templateUrl: './correos-clientes.component.html',
  styleUrls: ['./correos-clientes.component.css','./correos-clientes.component.scss']
})


export class CorreosClientesComponent implements OnInit {

  formFiltros: FormGroup;
  errorMessage:string;
  Usuario : any;

  empresaSeleccionada: number=0;
  Empresas: any;


  Correos: any[] = [];
  CorreosDefault: String;

  NuevoCorreo: String;

  constructor(private fb: FormBuilder, private UsuariosService:UsuariosService, private CorreosService:CorreosService) {
    this.empresaSeleccionada = 0;
    this.errorMessage ="";
    this.Empresas = [{ID:0, RFCEmisor:"Selecciona una Empresa"}];

    this.formFiltros = this.fb.group({
      empresaSeleccionada: [0],
      RFCCliente: [''],
      noClienteSAP: ['']
    });
    this.Usuario = JSON.parse(sessionStorage.getItem("Usuario")!);
    this.CorreosDefault ="";
    this.NuevoCorreo = "";
  }

  ngOnInit(): void {
    this.getEmpresas();
  }



  getEmpresas(){

    /**
     * Consumimos el service para obtener los permisos
     */
    this.UsuariosService.Get(this.Usuario['Username']).subscribe(
      data => {
        this.Empresas = data["Permisos_Emisor"];
        this.formFiltros = this.fb.group({
          empresaSeleccionada: [this.Empresas[0]["RFCEmisor"]],
          RFCCliente: [''],
          noClienteSAP: ['']
        });
      },
      error => {
        switch(error.error) {
          case "TokenInvalido": {
            sessionStorage.removeItem('Usuario');
            sessionStorage.clear();
            this.Usuario = null;
            alert("La sesion expiró");
            window.location.href ='/login';
            // this.router.navigate(['/login']);
             break;
          }
          default: {
             //statements;
             break;
          }
        }
      }
    );
  }

  getCorreos(){
    this.Correos = [];

    var Emisor = this.getCiaSAP(this.formFiltros.get('empresaSeleccionada')?.value.trim());
    var RFCCliente = this.formFiltros.get('RFCCliente')?.value;
    var Cliente = this.formFiltros.get('noClienteSAP')?.value;

    this.CorreosService.GetByClienteAndEmisor(Cliente,RFCCliente,Emisor).subscribe(
      data=>{
        if(data.length > 0)
        {
          this.Correos = data;
          this.CorreosDefault  = data;
        }
        else{
          this.errorMessage = data.ID;
        }
      },
      error => {
        switch(error.error) {
          case "TokenInvalido": {
            sessionStorage.removeItem('Usuario');
            sessionStorage.clear();
            this.Usuario = null;
            alert("La sesion expiró");
            window.location.href ='/login';
            // this.router.navigate(['/login']);
             break;
          }
          default: {
             //statements;
             break;
          }
        }
      }
    );

  }

  getCiaSAP(Emisor: string){
    var ciaSAP;
    switch(Emisor) {
      case "FGM790801SD7": {
        ciaSAP = "5550";
         break;
      } case "IBI790703DX4": {
        ciaSAP = "5512";
         break;
      } case "CMO881228RR9": {
        ciaSAP = "5511";
         break;
      } case "GMO790905GK1": {
        ciaSAP = "5510";
         break;
      } case "CMT9309039C8": {
        ciaSAP = "5515";
         break;
      }
      case "MIN211217Q18": {
        ciaSAP = "5518";
         break;
      }
      default: {
         ciaSAP = "0";
         break;
      }
    }
  return ciaSAP;
  }

  @Input() isEditMode: boolean = false;
  @Input() isEditModeInput: boolean = false;

  edit(Cliente_CorreoId: number){
    // debugger
    this.isEditMode = true;
    this.isEditModeInput = true;
    this.CorreosDefault = this.Correos.filter(correo => correo.Cliente_correoId == Cliente_CorreoId)[0]["Mail"];
  }

  delete(Cliente_CorreoId: number){
    // debugger
    var correo = this.Correos.filter(correo => correo.Cliente_correoId == Cliente_CorreoId)[0];
    this.CorreosService.DeleteCorreo(correo).subscribe(
      data=>{
        console.log(data);
        if(data._isOk == true)
        {
          alert(data._Mensaje)
          this.getCorreos();
        }
        else{
          this.errorMessage = data._Mensaje;
        }
      },
      error => {
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
          default: {
            //statements;
            break;
          }
        }
      }
    );
  }

  cancelEdit(Cliente_CorreoId: number){
    debugger
    this.isEditMode = false;
    this.isEditModeInput = false;

    let correo = this.CorreosDefault;

    this.Correos.filter(correo => correo.Cliente_correoId == Cliente_CorreoId)[0]["Mail"] = this.CorreosDefault;
  }


  limpiarFormulario(){
    this.formFiltros = this.fb.group({
      empresaSeleccionada: [this.Empresas[0]["RFCEmisor"]],
      RFCCliente: [''],
      noClienteSAP: ['']
    });
  }


 saveEdit(Cliente_CorreoId: number){
  var correo = this.Correos.filter(correo => correo.Cliente_correoId == Cliente_CorreoId)[0];
  console.log(correo);

  this.CorreosService.UpdateCorreo(correo).subscribe(
    data=>{

      if(data._isOk == true)
      {
        alert(data._Mensaje)
        this.getCorreos();
      }
      else{
        this.errorMessage = data._Mensaje;
      }
    },
    error => {
      switch(error.error) {
        case "TokenInvalido": {
          sessionStorage.removeItem('Usuario');
          sessionStorage.clear();
          this.Usuario = null;
          alert("La sesion expiró");
          window.location.href ='/login';
          // this.router.navigate(['/login']);
           break;
        }
        default: {
           //statements;
           break;
        }
      }
    }
  );

 }
}
