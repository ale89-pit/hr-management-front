import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../interface/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  url:string="http://localhost:8080/dipendente";
  costructor(){}

  async getEmployeeById(id:Number):Promise<EmployeeInterface|undefined>{
    let url=this.url+`/getByID?id=${id}`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }
}