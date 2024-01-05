import { Inject, Injectable } from '@angular/core';
import { RefNationality } from '../interface/refNationalitaInterface';

@Injectable({
  providedIn: 'root'
})
export class NationalityServiceService {
  public url: string="http://localhost:8080/refnazionalita"
  constructor() { }

  async gettAllNationality():  Promise<RefNationality[]> {
    let url=this.url+`/listanazionalita`;
    const data =  await fetch(url);
    return await data.json() ?? []; 
    
  }

  async addNationality(nazionalita: String): Promise<any> {
    let url = this.url+`/aggiungi/${nazionalita}`;
    const response =  await fetch(url,{
      method: 'POST',
    
      
    });
    return  response?? [];
  }
}
