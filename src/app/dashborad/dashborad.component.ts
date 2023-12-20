import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { EmployeeInterface } from '../interface/employeeInterface';
import { EmployeeServiceService } from '../employee-service.service';
import { CardEmployeeComponent } from '../card-employee/card-employee.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashborad',
  standalone: true,
  imports: [FormEmployeeComponent,CommonModule,CardEmployeeComponent,RouterModule],
  templateUrl: './dashborad.component.html',
  styleUrl: './dashborad.component.css'
})
export class DashboradComponent {

  showForm = false;
employees :EmployeeInterface[] = [];
  serviceEmply : EmployeeServiceService = inject(EmployeeServiceService)
  constructor() { 
    this.serviceEmply.getAllEmployees().then((emp)=>{
      this.employees = emp
      console.log(this.employees)
    })
  }

  toggle() {
    this.showForm = !this.showForm
    console.log(this.showForm)
  }
}
