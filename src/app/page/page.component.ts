import { CommonModule } from '@angular/common';
import { Component, Input, Output ,EventEmitter, OnInit, inject, OnChanges, SimpleChanges} from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit,OnChanges {
  
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() employees: EmployeeInterface[] = [];
  serviceEmply : EmployeeServiceService = inject(EmployeeServiceService)
  
  constructor(employeeService: EmployeeServiceService) {
    this.serviceEmply = employeeService;
  }

  ngOnInit(): void {
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('totalPages' in changes) {
     changes['totalPages'].currentValue;
     
      
    }
    
  }

  getPageNumbers(): number[] {
    // Crea un array di numeri di pagina da 1 a totalPages
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  

  changePage(newPage: number): void {
    this.pageChange.emit(newPage);
    this.currentPage = newPage;
   
  }

  nextPage():void{
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log("avanti")
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage():void{
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log("indietro")
      this.pageChange.emit(this.currentPage);
    }
  }
  
}
