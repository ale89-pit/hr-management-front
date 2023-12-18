import { Component, Input } from '@angular/core';
import { EmployeeInterface } from '../interface/employeeInterface';

@Component({
  selector: 'app-card-employee',
  standalone: true,
  imports: [],
  templateUrl: './card-employee.component.html',
  styleUrl: './card-employee.component.css'
})
export class CardEmployeeComponent {

  @Input() employee! : EmployeeInterface;
}
