export class FileToUpload {
    fileName: string = "";
    fileSize: number = 0;
    fileType: string = "";
    lastModifiedTime: number = 0;
    lastModifiedDate: Date = new Date();
    fileAsBase64?: string = "";
    Serie: string = "";
    Folio: string = "";
    SalesOrder: string="";
    NoCliente: String ="";
    ShipTo: string="";
    ASN: String ="";
    OC: string="";
    Tarimas: string="";
    DirEntrega: string="";
    Kilos: string="";
}