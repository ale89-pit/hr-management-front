import { Injectable} from '@angular/core';
import { FileUpload } from '../interface/fileUpload';

@Injectable({
  providedIn: 'root'
})
export class CurriculumServiceService {
  public key:string="files";
  public url: string="http://localhost:8080/curriculum";

  constructor() { }

  async addCVsFromIDDipendente(id_dipendente:number, curriculumFile: FileUpload[]): Promise<any> {
    const key:string="key";
    let url=this.url+`/esercizio_3/addCVsFromIDDipendente/${id_dipendente}`;
      const formData = new FormData();
      for (let file of curriculumFile) {
        formData.append(key, file.file,file.file.name);
      }   
      return await fetch(url, {
        method: 'POST',//strano! non devo specificare gli headers!?!?
        body: formData
      })
 }

  async deleteCVsFromID(id:number|undefined): Promise<any> {
    let url=this.url+`/deleteCVsFromID/${id}`;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async base64ToStringForTxt(base64String: string): Promise<string> {
    const decodedData = atob(base64String);
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const text = reader.result as string;
        resolve(text);
      };
        reader.onerror = reject;
        reader.readAsText(blob);
    });
  }

  base64ToStringForPdf(base64String: string): Blob {
    const decodedData = atob(base64String);
    const byteArray = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i);
    }
    return new Blob([byteArray], { type: 'application/pdf' });
    
  }


  async encodeBase64String(id:number,stringa: string): Promise<any> {
    //nonostante il nome non fa nessuna codifica perchè il blob nel back end è byte[], e lo fa in automatico
    //che il file sia in formato .txt o in formato .pdf non importa perche' il modo per fare la codifica è lo stesso
    const key='0123456789';
    const formData=new FormData();
    const blob =new Blob([stringa], { type: 'text/plain' });
    formData.append(key,blob,'astrubale.txt');
    let url=this.url+`/updateBlobCvFromID/${id}`;
    return await fetch(url, {
      method: 'PATCH',
      body:formData
    })
  }

  isTxtFile(fileContent: string): boolean {
    //se il file contiene solo caratteri ASCII, potrebbe essere un file .txt
    return /^[\x00-\x7F]*$/.test(fileContent) && !this.isPdfFile(fileContent);  
  }
  
  isPdfFile(fileContent: string): boolean {
    // Verifica se il contenuto del file inizia con la sequenza di byte corrispondente all'intestazione di un file PDF
    const pdfHeader = new Uint8Array([74, 86, 66, 69]); //new Uint8Array([37, 80, 68, 70]) header %PDF normale, non so perchè i miei pdf hanno un header diverso  
    let byte;
    for (let i = 0; i < pdfHeader.length; i++) {
      byte = fileContent.charCodeAt(i);
      //console.log(byte)
      //console.log(byte !== pdfHeader[i])
      if (byte !== pdfHeader[i]) {
        return false;
      }
    }
    return true;
  }

  writeStringToFile(content: string,id:number): void {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_'+id+'.txt';
    link.click();

    URL.revokeObjectURL(url);
  }
}


/* esempio di sviluppo
npm install pdfjs-dist

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
nng
export class PdfViewerComponent {
  base64String: string; // la tua stringa base64 del PDF
  pdfUrl: SafeUrl; // l'URL sicuro del PDF
}

<iframe [src]="pdfUrl" width="100%" height="600px" frameborder="0"></iframe>
<!-- o -->
<a [href]="pdfUrl" download="file.pdf">Scarica il PDF</a>

export class PdfViewerComponent {
  constructor(private sanitizer: DomSanitizer) {}

  decodeBase64() {
    const decodedData = atob(this.base64String);
    const blob = new Blob([decodedData], { type: 'application/pdf' });
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  }
}

export class PdfViewerComponent {
  // ...

  ngOnInit() {
    this.decodeBase64();
  }
}
*/