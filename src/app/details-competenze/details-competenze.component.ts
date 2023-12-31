import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../service/data-sharing-service.service';
import { CommonModule } from '@angular/common';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CompetenzeServiceService } from '../service/competenze-service.service';
import { ModalComponent } from "../modal/modal.component";
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
    selector: 'app-details-competenze',
    standalone: true,
    templateUrl: './details-competenze.component.html',
    styleUrl: './details-competenze.component.css',
    imports: [CommonModule, ModalComponent]
})
export class DetailsCompetenzeComponent implements OnInit{
  alert:ModalContent={
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined
  }
  showModal!:boolean;
  employee!:EmployeeInterface;
  competenzaID!:number;
  constructor(private employeeService: EmployeeServiceService,
    private dataSharingService: DataSharingService,
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
    this.alert={
      messaggio:"Vuoi continuare?",
      avviso: "Attenzione la cancellazione di una competenza comporta la sua cancellazione in ogni curriculum",
      tipo: Opzioni.Cancella
    }
    this.showModal = true;
    this.competenzaID=idCompetenza;
  }
  closeModal(conferma:ModalInterface){
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Cancella):{
          
          this.competenzeService.deleteSkillByIdEmployeeIdTipskill(this.dataSharingService.data.idDipendente,this.competenzaID).then(response=>{
            //if(resposne.ok) è equivalente a
            if(response.status==200)
            {
              /*this.dataSharingService.data.skills?.splice(this.dataSharingService.data.skills?.findIndex(obj=>obj.idTipskill===this.competenzaID),1);
              this.employee=this.dataSharingService.data;
              this.dataSharingService.updateData(this.dataSharingService.data);*/
              this.employeeService.getEmployeeById(this.dataSharingService.data.idDipendente).then((x)=>{
                this.dataSharingService.updateData(x);
                this.employee=x
              }).catch(error=>{
                console.log("ERROR getEmployeeById(...) call: "+error);
              });
            }
          }).catch(error=>{
            console.log("ERROR deleteSkillByIdEmployeeIdTipskill(...) call: "+error);
          });
          break;
        }
      }        
    }
    this.showModal = false
  }

}
