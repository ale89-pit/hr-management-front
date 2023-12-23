import { CommonModule } from "@angular/common";
import { FormCurriculumComponent } from "../form-curriculum/form-curriculum.component";
import { Component,  OnInit } from "@angular/core";
import { DataSharingService } from "../service/data-sharing-service.service";
import { CurriculumServiceService } from "../service/curriculum-service.service";
import {Router} from "@angular/router";
import { FormTipskillComponent } from "../form-tipskill/form-tipskill.component";
import { EmployeeInterface } from "../interface/employeeInterface";

@Component({
    selector: 'app-details-curriculum',
    standalone: true,
    templateUrl: './details-curriculum.component.html',
    styleUrl: './details-curriculum.component.css',
    imports: [CommonModule,FormCurriculumComponent,FormTipskillComponent]
})
export class DetailsCurriculumComponent implements OnInit{
  showForm!: boolean;
  employee!:EmployeeInterface;
  
  constructor(private router: Router,
    private dataSharingService: DataSharingService,
    private curriculumService: CurriculumServiceService,
    ) {}
    
  ngOnInit(): void {
    this.employee = this.dataSharingService.data;
    this.dataSharingService.data$.subscribe((newEmployee) => {
      this.employee = newEmployee;
    }); 
    this.showForm=false;
  }
  
  deleteCurriculum(id:number)
  {
    if(this.dataSharingService.data.idDipendente!=-1){
      this.curriculumService.deleteCVsFromID(id).then(response=>{
        //if(resposne.ok) è equivalente a
        if(response.status==200)
        {
          alert("CV cancellato!");
          this.router.navigate(['details/'+this.dataSharingService.data.idDipendente]);
        }
      });
    }
  }

  toggle() {
    this.showForm = !this.showForm
    console.log(this.showForm)
  }
}
