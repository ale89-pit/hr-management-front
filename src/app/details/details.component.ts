import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employee-interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  employeeService=inject(EmployeeServiceService)
  employee:EmployeeInterface|undefined;
  id=Number(this.route.snapshot.params['id']);

  constructor()  {
    this.employeeService.getEmployeeById(this.id).then(x=>{this.employee=x;});
  }
}
