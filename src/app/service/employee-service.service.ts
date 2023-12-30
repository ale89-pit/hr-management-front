import { Inject, Injectable } from "@angular/core";
import { EmployeeInterface } from "../interface/employeeInterface";
import { EmployeeDTOInterface } from "../interface/employeeDTOInterface";
import { Page } from "../interface/pageInterface";



@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  public url:string="http://localhost:8080/dipendente";



  constructor() {}

  async getAllEmployees(page:number):  Promise<Page<EmployeeInterface>> {
    let url=this.url+`/diplistpage?page=${page}`;
    const data = await fetch(url);
    return await data.json() ?? { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
  }

  async addEmployee(employee: EmployeeDTOInterface): Promise<EmployeeDTOInterface> {
    let url=this.url+`/aggiungiDipendente`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    if(!response.ok){
      throw new Error('Failed to delete employee');      
    }    
    const data = await response.json()??[];
    return data   
  }

  async getEmployeeById(id:Number|undefined):Promise<EmployeeInterface>{
    let url=this.url+`/getByID?id=${id}`;
    const response = await fetch(url,{
      method:"GET",        
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(!response.ok){
      throw new Error('Failed to get employee');      
    }    
    const data = await response.json()??[];
    return data
  }

  async patchEmployeeById(dipendente:EmployeeInterface):Promise<any>{
    let url=this.url+`/modificaDipendente`;
    return await fetch(url,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(dipendente)
    });
  }
  async deleteEmployeeById(id:Number):Promise<any>{
    let url=this.url+`/esercizio_4?id=${id}`;
    return await fetch(url, { 
      method: 'DELETE',    
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}