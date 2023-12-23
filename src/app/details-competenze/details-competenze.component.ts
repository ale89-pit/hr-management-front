import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../service/data-sharing-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CompetenzeServiceService } from '../service/competenze-service.service';
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-details-competenze',
    standalone: true,
    templateUrl: './details-competenze.component.html',
    styleUrl: './details-competenze.component.css',
    imports: [CommonModule, ModalComponent]
})
export class DetailsCompetenzeComponent implements OnInit{
  confermaCancellazione: string="Vuoi cancellare questa competenza?";
  showModal!:boolean;
  employee!:EmployeeInterface;
  competenzaID!:number;
  constructor(private dataSharingService: DataSharingService,
    private router: Router,
    private competenzeService: CompetenzeServiceService
    ) { }

    ngOnInit(): void {
      this.employee = this.dataSharingService.data;
      this.dataSharingService.data$.subscribe((newEmployee) => {
        this.employee = newEmployee;
      });
      this.showModal=false;
    }

  CancellaCompetenza(idCompetenza:number)  {
    this.showModal = true;
    this.competenzaID=idCompetenza;
  }
  closeModal(conferma:boolean){
  if(conferma){
      this.competenzeService.deleteSkillByIdEmployeeIdTipskill(this.dataSharingService.data.idDipendente,this.competenzaID).then(response=>{
        //if(resposne.ok) è equivalente a
        if(response.status==200)
        {
          this.dataSharingService.data.skills?.splice(this.dataSharingService.data.skills?.findIndex(obj=>obj.idTipskill===this.competenzaID),1);
          this.employee=this.dataSharingService.data;
          this.router?.navigate(['details/'+this.dataSharingService.data.idDipendente]);
        }
      });
    }
    this.showModal = false
  }

}
