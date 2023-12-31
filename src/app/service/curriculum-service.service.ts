import { Injectable} from '@angular/core';
import { FileUpload } from '../interface/fileUpload';
@Injectable({
  providedIn: 'root'
})
export class CurriculumServiceService {
  public url: string="http://localhost:8080/curriculum";

  constructor() { }

  async addCVsFromIDDipendente(id_dipendente:number, curriculumFile: FileUpload[]): Promise<any> {
    const key:string="key";
    let url=this.url+`/esercizio_3/addCVsFromIDDipendente/${id_dipendente}`;
      const formData = new FormData();
      for (let file of curriculumFile) {
        formData.append(key, file.file,file.file.name);console.log(file.file)
      }   
      return await fetch(url, {
        method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=------------------------' + Math.random().toString(36).substring(7)
        },
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
 
  decodeBase64String(base64String: string): Promise<string> {
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

  async encodeBase64String(id:number,stringa: string): Promise<any> {
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
}
