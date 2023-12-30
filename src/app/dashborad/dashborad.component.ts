import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { EmployeeInterface } from '../interface/employeeInterface';
import { EmployeeServiceService } from '../service/employee-service.service';
import { CardEmployeeComponent } from '../card-employee/card-employee.component';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { Observable, Subscription } from 'rxjs';
import { Page } from '../interface/pageInterface';

@Component({
  selector: 'app-dashborad',
  standalone: true,
  imports: [FormEmployeeComponent, CommonModule, CardEmployeeComponent, RouterModule, PageComponent],
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit, OnChanges, OnDestroy {

  showForm = false;
  @Input() employeesPage: Observable<Page<EmployeeInterface>> | undefined;
  employeesList: EmployeeInterface[] = [];
  serviceEmply: EmployeeServiceService;

  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 1;
  private employeesSubscription: Subscription | undefined;

  constructor(private employeeService: EmployeeServiceService) {
    this.serviceEmply = employeeService;
  }

  ngOnInit(): void {
    
    this.serviceEmply.getAllEmployees(this.currentPage- 1).then((emp) => {
      console.log(emp);
      this.employeesList = emp.content;
      this.currentPage = emp.number + 1;
      this.totalPages = emp.totalPages;
      console.log(this.employeesList);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeesPage'] && this.employeesPage) {
      
      if (this.employeesSubscription) {
        this.employeesSubscription.unsubscribe();
      }

      // Sottoscrivi all'observable
      this.employeesSubscription = this.employeesPage.subscribe(
        (emp) => {
          this.employeesList = emp.content;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
    }
  }

  changePage(newPage: number): void {
    this.serviceEmply.getAllEmployees(newPage - 1).then((emp) => {
      console.log(emp);
      this.employeesList = emp.content;
      console.log(this.employeesList);
    });
  }

  toggle() {
    this.showForm = !this.showForm;
    console.log(this.showForm);
  }

  ngOnDestroy(): void {
    // Disiscrivi alla distruzione del componente
    if (this.employeesSubscription) {
      this.employeesSubscription.unsubscribe();
    }
  }
}
