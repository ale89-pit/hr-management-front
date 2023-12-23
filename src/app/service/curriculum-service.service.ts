import { Inject, Injectable} from '@angular/core';
import { FileUpload } from '../interface/fileUpload';
@Injectable({
  providedIn: 'root'
})
export class CurriculumServiceService {
  public key:string="curriculum";
  public url: string="http://localhost:8080";

  constructor() { }

  async addCVsFromIDDipendente(id:number|undefined, selectedFiles: FileUpload[]): Promise<any> {
    let url=this.url+`/esercizio_3/addCVsFromIDDipendente/${id}`;
      const formData = new FormData();
      for (let file of selectedFiles) {
        formData.append(this.key, file.file);
      }      
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }) 
      
  }
  async deleteCVsFromID(id:number|undefined): Promise<any> {
    let url=this.url+`/deleteCVsFromID/${id}`;
      return await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })   
  }
}
