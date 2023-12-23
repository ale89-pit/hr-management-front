import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../service/data-sharing-service.service';
import { Router } from '@angular/router';
import { TipskillServiceService } from '../service/tipskill-service.service';
import { CommonModule } from '@angular/common';
import { EmployeeInterface } from '../interface/employeeInterface';

@Component({
  selector: 'app-details-tipskill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-tipskill.component.html',
  styleUrl: './details-tipskill.component.css'
})
export class DetailsTipskillComponent implements OnInit{
  showForm!: boolean;
  employee!:EmployeeInterface;

  constructor(private dataSharingService: DataSharingService,
    private router: Router,
    private skillsService: TipskillServiceService
    ) { }

    ngOnInit(): void {
      this.employee = this.dataSharingService.data;
      this.dataSharingService.data$.subscribe((newEmployee) => {
        this.employee = newEmployee;
      }); 
      this.showForm=false;
    }

  CancellaTipskill()  {
    this.skillsService.deleteSkillById(this.dataSharingService.data.idDipendente).then(response=>{
      //if(resposne.ok) è equivalente a
      if(response.status==200)
      {
        alert("Competenza cancellata!");
        this.router?.navigate(['details/'+this.dataSharingService.data.idDipendente]);
      }
    });
  }

}
