import { Inject, Injectable } from "@angular/core";
import { EmployeeInterface } from "../interface/employeeInterface";
import { EmployeeDTOInterface } from "../interface/employeeDTOInterface";
import { Page } from "../interface/pageInterface";
import { BehaviorSubject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private employeesListSubject = new BehaviorSubject<EmployeeInterface[]>([]);
  employeesList$ = this.employeesListSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(1);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  totalPages$ = this.totalPagesSubject.asObservable();
  private filterActiveSubject = new BehaviorSubject<boolean>(false);
  filterActive$ = this.filterActiveSubject.asObservable();

  public url:string="http://localhost:8080/dipendente";



  constructor() {}

  async getAllEmployees(page:number):  Promise<Page<EmployeeInterface>> {
    let url=this.url+`/diplistpage?page=${page}`;
    const data = await fetch(url);
    const employees = await data.json() ?? { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    this.employeesListSubject.next(employees.content);
    this.totalPagesSubject.next(employees.totalPages);
    this.currentPageSubject.next(employees.number + 1);
    return employees
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
    this.getAllEmployees((await this.getAllEmployees(0)).totalPages-1);
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
  
  async filterEmployeebetweenDateandSkill(startDate: string, endDate: string, skill: string []): Promise<Page<EmployeeInterface>> {
    let url = this.url+`/dipendentiPerDataDiNascitaECompetenze?dataInizio=1977-01-01&dataFine=2021-01-01&skill=Java?startDate=${startDate}&endDate=${endDate}&skill=${skill}`;
    const data = await fetch(url);
    const employees = await data.json() ?? { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    this.employeesListSubject.next(employees.content);
    return employees;
  }

  async filterBynameSurname(nameSurname : string, page: number): Promise<Page<EmployeeInterface>> {
    let url = this.url+`/filterListName?nomeCognome=${nameSurname}&page=${page}`;
    const data = await fetch(url);
    const employees = await data.json() ?? { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    this.employeesListSubject.next(employees.content);
    this.currentPageSubject.next(employees.number + 1);
    this.totalPagesSubject.next(employees.totalPages);
    
    return employees;
  }
}