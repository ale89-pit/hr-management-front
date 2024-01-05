
import { Component,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {

  @Output() searchInput:EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';
  @Output() employees: EventEmitter<EmployeeInterface[]> = new EventEmitter<EmployeeInterface[]>();
 
  

  constructor(private employeeService: EmployeeServiceService) { }
 

  search() {
    this.searchInput.emit(this.searchText);
   this.employeeService.filterBynameSurname(this.searchText, 0).then((emp) => {
    console.log(emp);
    this.employees.emit(emp.content);
    
  });

  
}

}