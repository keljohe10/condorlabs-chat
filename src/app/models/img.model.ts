export class FileItem {

public archivo: File;
public nombreArchivo: string;
public type: string;
public url: string;
public uid: string;

  constructor( archivo: File) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.type = archivo.type;
  }
}
