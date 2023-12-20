import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../interface/employeeInterface';
import { EmployeeDTOInterface } from '../interface/employeeDTOInterface';
import { EmployeeDTOInterfaceUpdate } from '../interface/employeeDTOInterfaceUpdate';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  url:string="http://localhost:8080/";

  costructor(){}


  async getAllEmployees():  Promise<EmployeeInterface[]> {
    let url=this.url+`dipendente/diplist`;
    const data = await fetch(url);
    return await data.json() ?? [];
  }

  async addEmployee(employee: EmployeeDTOInterface): Promise<EmployeeDTOInterface> {
    let url=this.url+`dipendente/aggiungiDipendente`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    if(response.ok){
      const data = await response.json();
      return data
    }else{
      throw new Error('Failed to add employee');
    }   
  }

  async getEmployeeById(id:Number):Promise<EmployeeInterface>{
    let url=this.url+`dipendente/getByID?id=${id}`;
    const response = await fetch(url);
    const data = await response.json() ?? [];
    return data
  }

  async patchEmployeeById(dipendente:EmployeeDTOInterfaceUpdate):Promise<void>{
    let url=this.url+`dipendente/modificaDipendente`;
    const response = await fetch(url,{
      method:'PATCH',
      body:JSON.stringify(dipendente)
    });
    const data = await response.json() ?? [];
    return data
  }
  async deleteEmployeeById(id:Number):Promise<void>{
    let url=this.url+`dipendente/esercizio_4?id=${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json() ?? [];
    return data
  }
}