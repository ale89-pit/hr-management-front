import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../app/interface/employeeInterface';
import { EmployeeDTOInterface } from './interface/employeeDTOInterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  url="http://localhost:8080/dipendente/diplist?password=asd"
  urlAddEmployee="http://localhost:8080/dipendente/aggiungiDipendente"
  constructor() { }

  async getAllEmployees():  Promise<EmployeeInterface[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async addEmployee(employee: EmployeeDTOInterface): Promise<EmployeeDTOInterface> {
    const response = await fetch(this.urlAddEmployee, {
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
}
