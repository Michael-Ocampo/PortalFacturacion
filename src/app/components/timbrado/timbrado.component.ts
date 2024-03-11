import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturasService } from '../../services/facturas/facturas.service'; 
import { FileToUpload } from './file-to-upload';


@Component({
  selector: 'app-timbrado',
  templateUrl: './timbrado.component.html',
  styleUrls: ['./timbrado.component.css']
})
export class TimbradoComponent implements OnInit {
  formFactura: FormGroup;
  private FileName;
  fileData: any;
  MAX_SIZE: number = 1048576;
  constructor(private fb: FormBuilder, private router:Router, private route: ActivatedRoute,private FacturasService:FacturasService) { 
    this.formFactura = this.fb.group({
      xmlSAP: ['',Validators.required],
      Serie: ['', Validators.required],
      Folio: ['', Validators.required],
      NoCliente: ['', Validators.required],
      SalesOrder: ['', Validators.required],
      ShipTo: ['', Validators.required],
      OC: ['', Validators.required],
      ASN: ['', Validators.required],
      Tarimas: ['', Validators.required],
      DirEntrega: ['', Validators.required],
      Kilos: ['', Validators.required]
    });
    this.FileName = "";
  }

  ngOnInit(): void {
  }

  public onFileChange(event: any) {
    this.fileData = null;
    if (event.target.files && event.target.files.length > 0) {
        // Don't allow file sizes over 1MB
        if (event.target.files[0].size < this.MAX_SIZE) {
            // Set theFile property
            this.fileData = event.target.files[0];
        }
        else {
            // Display error message
            //this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
        }
    }
    
    //this.file = event.target.files[0];
    
    
    // const reader = new FileReader();
 
    // if (event.target.files && event.target.files.length) {
    //   this.fileName = event.target.files[0].name;
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
     
    //   reader.onload = () => {
    //     this.formFactura.patchValue({
    //       xmlSAP: reader.result
    //     });
    //   };
    // }
  }

  uploadFile(): void {
    this.sendXML(this.fileData);
}

  sendXML(xmlSAP:any){
    let file = new FileToUpload();
    
    // Set File Information
    file.fileName = xmlSAP.name;
    file.fileSize = xmlSAP.size;
    file.fileType = xmlSAP.type;
    file.lastModifiedTime = xmlSAP.lastModified;
    file.lastModifiedDate = xmlSAP.lastModifiedDate;
    file.Serie = this.formFactura.get('Serie')?.value;
    file.Folio = this.formFactura.get('Folio')?.value;
    file.NoCliente = this.formFactura.get('NoCliente')?.value;
    file.SalesOrder = this.formFactura.get('SalesOrder')?.value;
    file.ShipTo = this.formFactura.get('ShipTo')?.value;
    file.OC = this.formFactura.get('OC')?.value;
    file.ASN = this.formFactura.get('ASN')?.value;
    file.Tarimas = this.formFactura.get('Tarimas')?.value;
    file.DirEntrega = this.formFactura.get('DirEntrega')?.value;
    file.Kilos = this.formFactura.get('Kilos')?.value;


    let reader = new FileReader();
    
    // Setup onload event for reader
    reader.onload = () => {
        file.fileAsBase64 = reader.result?.toString();
        this.FacturasService.upload(file).subscribe(
          data => {   
          console.log(data);   
          this.getXML(data, file.Serie, file.Folio);
        },    
        error => {           
          console.log(error); 
        });
    }
    reader.readAsDataURL(xmlSAP);

  
  }

  getXML(data:any, serie:string, folio:string)
  {
    let filename = serie + '-' + folio + '.xml'; 
          let element = document.createElement('a');
          element.setAttribute('href', 'data:text/xml;charset=utf-8,' + data);
          element.setAttribute('target', '_blank');
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

  }


  
    
}
