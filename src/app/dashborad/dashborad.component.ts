import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { EmployeeInterface } from '../interface/employeeInterface';
import { EmployeeServiceService } from '../service/employee-service.service';
import { CardEmployeeComponent } from '../card-employee/card-employee.component';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { Observable, Subscription } from 'rxjs';
import { Page } from '../interface/pageInterface';
import { SearchComponentComponent } from '../search-component/search-component.component';

@Component({
  selector: 'app-dashborad',
  standalone: true,
  imports: [FormEmployeeComponent, CommonModule, CardEmployeeComponent, RouterModule, PageComponent,SearchComponentComponent],
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit, OnChanges, OnDestroy {

  showForm :  boolean = false;
  employeesList: EmployeeInterface[] = [];
  serviceEmply: EmployeeServiceService;
 

  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 1;

  searchText: string = '' ;

  handleSearchInput(value: string) {
    this.searchText = value;
    console.log(this.searchText);
  }

  constructor(private employeeService: EmployeeServiceService) {
    this.serviceEmply = employeeService;
  }

  ngOnInit(): void {
    
    this.serviceEmply.getAllEmployees(this.currentPage- 1).then((emp) => {
      console.log(emp);
      this.employeesList = emp.content;
      this.currentPage = emp.number + 1;
      this.totalPages = emp.totalPages;
      this.totalElements = emp.totalElements;
      console.log(this.employeesList);
    });

    
  }



  ngOnChanges(changes: SimpleChanges): void {
  
 
  }
  changePage(newPage: number): void {
    if(this.searchText.length > 0){
      this.serviceEmply.filterBynameSurname(this.searchText, newPage - 1).then((emp) => {
        console.log(emp);
        this.employeesList = emp.content;
        this.currentPage = emp.number + 1;
      });
    }else{
      this.serviceEmply.getAllEmployees(newPage - 1).then((emp) => {
        console.log(emp);
        this.employeesList = emp.content;
        this.currentPage = emp.number + 1;
      });
      
    }
  }

  resultSearch(employees: EmployeeInterface[]): void {
    this.employeesList = employees;
  
 
  }
 

  toggle() {
    this.showForm = !this.showForm;
    
  }

  ngOnDestroy(): void {
    
   
  }
}
