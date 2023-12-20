import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../interface/employee-interface';
import { RefNationalitaInterface } from '../interface/ref-nazionalita-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  url:string="http://localhost:8080/";
  costructor(){}

  async getEmployeeById(id:Number):Promise<EmployeeInterface|undefined>{
    let url=this.url+`dipendente/getByID?id=${id}`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }
  async getAllRefNaionalita():Promise<RefNationalitaInterface[]>{
    let url=this.url+`refnazionalita/listanazionalita`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }
  async patchEmployeeById(dipendente:EmployeeInterface):Promise<void>{//non funiona ancora
    let url=this.url+`dipendente//modificaDipendente`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }
  async deleteEmployeeById(id:Number):Promise<void>{
    let url=this.url+`dipendente/esercizio_4?id=${id}`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }
}