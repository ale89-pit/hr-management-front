import { Injectable } from '@angular/core';
import { RefNationality } from '../interface/refNationalitiInterface';

@Injectable({
  providedIn: 'root'
})
export class NationalityServiceService {

  url ="http://localhost:8080/refnazionalita/listanazionalita"
  constructor() { }

  async gettAllNationality():  Promise<RefNationality[]> {
    const data =  await fetch(this.url);
    return await data.json() ?? []; 
    
  }
}
