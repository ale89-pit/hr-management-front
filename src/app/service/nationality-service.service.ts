import { Injectable } from '@angular/core';
import { RefNationality } from '../interface/refNationalitaInterface';

@Injectable({
  providedIn: 'root'
})
export class NationalityServiceService {

  url ="http://localhost:8080/";
  constructor() { }

  async gettAllNationality():  Promise<RefNationality[]> {
    let url=this.url+`refnazionalita/listanazionalita`;
    const data =  await fetch(url);
    return await data.json() ?? []; 
    
  }
}
