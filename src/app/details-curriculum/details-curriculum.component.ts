import { CommonModule } from "@angular/common";
import { FormCurriculumComponent } from "../form-curriculum/form-curriculum.component";
import { Component, inject } from "@angular/core";
import { DataSharingService } from "../service/data-sharing-service.service";
import { EmployeeServiceService } from "../service/employee-service.service";
import { EmployeeInterface } from "../interface/employeeInterface";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-details-curriculum',
    standalone: true,
    templateUrl: './details-curriculum.component.html',
    styleUrl: './details-curriculum.component.css',
    imports: [CommonModule,FormCurriculumComponent]
})
export class DetailsCurriculumComponent {
  dataSharingService: DataSharingService=inject(DataSharingService);
  employeeService:EmployeeServiceService=inject(EmployeeServiceService) ;
  employee:EmployeeInterface | undefined;
  showForm = false;
  router=inject(ActivatedRoute);
  constructor() {
    this.employeeService.getEmployeeById(this.dataSharingService.employeeID).then(x=>{this.employee=x;});
  }
  
  deleteCurriculum(id:number)
  {
    this.employee?.curriculum.deleteCVsFromID(id).then(response=>{
      //if(resposne.ok) è equivalente a
      if(response.status==200)
      {
        alert("CV cancellato!");
        this.router.navigate(['details/'+this.employee?.idDipendente]);
       }
    });
  }

  toggle() {
    this.showForm = !this.showForm
    console.log(this.showForm)
  }
}
