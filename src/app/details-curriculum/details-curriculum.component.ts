import { CommonModule } from "@angular/common";
import { FormCurriculumComponent } from "../form-curriculum/form-curriculum.component";
import { Component, inject } from "@angular/core";
import { DataSharingService } from "../service/data-sharing-service.service";
import { EmployeeServiceService } from "../service/employee-service.service";
import { EmployeeInterface } from "../interface/employeeInterface";
import { CurriculumServiceService } from "../service/curriculum-service.service";
import {Router} from "@angular/router";
import { FormTipskillComponent } from "../form-tipskill/form-tipskill.component";

@Component({
    selector: 'app-details-curriculum',
    standalone: true,
    templateUrl: './details-curriculum.component.html',
    styleUrl: './details-curriculum.component.css',
    imports: [CommonModule,FormCurriculumComponent,FormTipskillComponent]
})
export class DetailsCurriculumComponent {
  dataSharingService: DataSharingService=inject(DataSharingService);
  employeeService:EmployeeServiceService=inject(EmployeeServiceService);
  curriculumService=inject(CurriculumServiceService);
  employee:EmployeeInterface= {
    idDipendente:this.dataSharingService.employeeID,
    nome: undefined,
    cognome: undefined,
    dataDiNascita: undefined,
    matricola: undefined,
    citta: undefined,
    indirizzo: undefined,
    rowExist:undefined,
    skills:undefined,
    refNazionalita:undefined,
    curriculum:undefined
}
  showForm = false;
  constructor(private router: Router) {
    this.employeeService.getEmployeeById(this.employee.idDipendente).then(x=>{this.employee=x;});
    console.log(this.employee.curriculum)
  }
  
  deleteCurriculum(id:number)
  {
    if(this.employee.curriculum!=undefined){
      this.curriculumService.deleteCVsFromID(id).then(response=>{
        //if(resposne.ok) è equivalente a
        if(response.status==200)
        {
          alert("CV cancellato!");
          this.router.navigate(['details/'+this.employee?.idDipendente]);
        }
      });
    }
  }

  toggle() {
    this.showForm = !this.showForm
    console.log(this.showForm)
  }
}
