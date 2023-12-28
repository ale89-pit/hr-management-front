import { CommonModule } from "@angular/common";
import { FormCurriculumComponent } from "../form-curriculum/form-curriculum.component";
import { Component,  OnInit } from "@angular/core";
import { DataSharingService } from "../service/data-sharing-service.service";
import { CurriculumServiceService } from "../service/curriculum-service.service";
import { FormTipskillComponent } from "../form-tipskill/form-tipskill.component";
import { EmployeeInterface } from "../interface/employeeInterface";
import { ModalComponent } from "../modal/modal.component";
import { EmployeeServiceService } from "../service/employee-service.service";
import { ModalContent, ModalInterface, Opzioni } from "../interface/modalInterface";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'app-details-curriculum',
    standalone: true,
    templateUrl: './details-curriculum.component.html',
    styleUrl: './details-curriculum.component.css',
    imports: [CommonModule, FormCurriculumComponent, FormTipskillComponent, ModalComponent,ReactiveFormsModule]
})
export class DetailsCurriculumComponent implements OnInit{
  alert:ModalContent={
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined
  }
  curriculumID!:number;
  showModal!:boolean;
  showForm!:boolean;
  employee!:EmployeeInterface;
  form = new FormGroup({
    cvPdfText: new FormControl('')
  });
  
  constructor(private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    private curriculumService: CurriculumServiceService,
    private employeeService: EmployeeServiceService
    ) {}
    
  ngOnInit(): void {
    this.showModal = false;
    this.showForm = false;
    this.employee = this.dataSharingService.data;
    this.dataSharingService.data$.subscribe((newEmployee) => {
      this.employee = newEmployee;
    });
    this.form =this.formBuilder.group({
      cvPdfText: ['',[Validators.required]]
    })
  }

  deleteCurriculum(idCurriculum:number)  {
    this.alert={
      messaggio:"Vuoi continuare?",
      avviso: "Attenzione la cancellazione del curriculum comporta la cancellazione di alcune competenze ad esso collegate",
      tipo: Opzioni.Cancella
    }
    this.showModal = true;
    this.curriculumID=idCurriculum;
  }

  editCurriculum(idCurriculum:number){
    if(!this.form.controls.cvPdfText.invalid)
    {
      this.alert={
        messaggio:"Vuoi modificare il contenuto del curriculum?",
        avviso: undefined,
        tipo: Opzioni.Modifica
      }
      this.showModal = true;
      this.curriculumID=idCurriculum;
    }
    
  }

  ModificaArea(id:number):void  {
    if (this.employee.curriculum) {
      const curriculum = this.employee.curriculum.find(x => x.idCurriculum == id);
      if (curriculum) {
        curriculum.modificaCurriculum = !curriculum.modificaCurriculum
      }
    }
  }

  closeModal(conferma:ModalInterface){
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Cancella):{
          this.curriculumService.deleteCVsFromID(this.curriculumID).then(response=>{
            //if(resposne.ok) è equivalente a
            if(response.status==200)
            {
              //protri fare come in details-competenze in cui gioco con la lista ".data.skills",
              //ma qui avrei un problema tedioso da risolvere tra lista ".data.curriculum" e ".data.skills"
              //(comunque con una query: prendo il cv cancellato e devo cercarmi le skills collegate...) 
              //ma che si può risolvere velocemente adandosi a ripescare il dipendente
              this.employeeService.getEmployeeById(this.dataSharingService.data.idDipendente).then((x)=>{
                this.dataSharingService.updateData(x);
                this.employee=x
              }).catch(error=>{
                console.log("ERROR getEmployeeById(...) call: "+error);
              });
            }
          }).catch(error=>{
            console.log("ERROR deleteCVsFromID(...) call: "+error);
          });
          break;
        }
        case(Opzioni.Modifica):{
          if(this.form.value.cvPdfText!==null && this.form.value.cvPdfText!==undefined){//console.log(this.form.value.cvPdfText)
            this.curriculumService.encodeBase64String(this.curriculumID, this.form.value.cvPdfText).then(response=>{
              if(response.status==200)
              {
                this.employeeService.getEmployeeById(this.dataSharingService.data.idDipendente).then((x)=>{//console.log(x)
                  this.dataSharingService.updateData(x);
                  this.employee=x
                }).catch(error=>{
                  console.log("ERROR getEmployeeById(...) call: "+error);
                });
              }
            }).catch(error=>{
              console.log("ERROR encodeBase64String(...) call: "+error);
            });
          }
          break;
        }
      }
    }
    this.showModal = false
  }

  toggle(){
    this.showForm=!this.showForm;
  }
}
