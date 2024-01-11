import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  private currentPageSubscription: Subscription;
  private totalPagesSubscription: Subscription;
  

  constructor(private employeeService: EmployeeServiceService) {
    this.currentPageSubscription = this.employeeService.currentPage$.subscribe((currentPage) => {
      this.currentPage = currentPage;
    });

    this.totalPagesSubscription = this.employeeService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

  }


  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(newPage: number): void {
    this.pageChange.emit(newPage);
   
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log("avanti");
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log("indietro");
      this.pageChange.emit(this.currentPage);
    }
  }
}
