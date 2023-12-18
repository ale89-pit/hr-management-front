import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../app/interface/employeeInterface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  url="http://localhost:8080/dipendente/diplist?password=asd"
  constructor() { }

  async getAllEmployees():  Promise<EmployeeInterface[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
