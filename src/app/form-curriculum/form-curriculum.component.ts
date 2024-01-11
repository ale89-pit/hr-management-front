import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumServiceService } from '../service/curriculum-service.service';
import { DataSharingService } from '../service/data-sharing-service.service';
import { FileUpload } from '../interface/fileUpload';
import { EmployeeInterface } from '../interface/employeeInterface';
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';
import { ModalComponent } from '../modal/modal.component';
import { EmployeeServiceService } from '../service/employee-service.service';


@Component({
  selector: 'app-form-curriculum',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './form-curriculum.component.html',
  styleUrls: ['./form-curriculum.component.css']
})
export class FormCurriculumComponent implements OnInit{  
  alert:ModalContent={
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined,
    showAnnulla: undefined
  }
  employee!:EmployeeInterface;
  isAtLeastOneCv!:boolean;
  public selectedFiles: FileUpload[]=[];
  public showModal!: boolean;
  showForm!: boolean
  submitted!:boolean

  constructor(private employeeService: EmployeeServiceService,
    private dataSharingService: DataSharingService,
    private curriculumService: CurriculumServiceService
    ) {  }

    ngOnInit(): void {
      this.submitted=false
      this.showForm = false;
      this.showModal = false;
      this.employee = this.dataSharingService.data;
      this.isAtLeastOneCv=false;
      this.dataSharingService.data$.subscribe((newEmployee) => {
        this.employee = newEmployee;
      });
    }

    onFileChange(event: any) {
      this.isAtLeastOneCv=true;
      const fileList: FileList = event.target.files;
      this.selectedFiles = [];
      for (let i = 0; i < fileList.length; i++) {
        const fileUpload: FileUpload = { file: fileList[i], progress: 0 };
        this.selectedFiles.push(fileUpload);
      }
    }

  uploadFiles(){
    this.submitted=true;
    if(this.selectedFiles.length> 0) {
      this.alert={
        messaggio:"Vuoi aggiungere un nuovo curriculum?",
        avviso:undefined,
        tipo: Opzioni.Aggiungi,
        showAnnulla: true
      }
      this.showModal = true;
    }
  }
  
  closeModal(conferma:ModalInterface)  {
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Aggiungi):{
          this.curriculumService.addCVsFromIDDipendente(this.dataSharingService.data.idDipendente, this.selectedFiles).then((response) => {
            //console.log(response.status);
            switch(response.status){
              case(200): { 
                this.employeeService.getEmployeeById(this.dataSharingService.data.idDipendente).then((x)=>{
                  this.dataSharingService.updateData(x);
                  this.employee=x
                  this.ShowForm()
                }).catch(error=>{
                  console.log("ERROR getEmployeeById(...) call: "+error);
                });
                break;
              };
              case(208): {//puoi controllare il valore dello status uando il back-end lancia RecourceAlreadyPresenteException
                //uesta paarte dell'alert la fa in maniera asincrona e soprattutto dopo la chiusura dll'allert di prima
                this.alert={
                  messaggio:undefined,
                  avviso:"Errore durante l'aggiunta del curriculum. Possibili duplicati!",
                  tipo: Opzioni.ErroreCVsDuplicati,
                  showAnnulla: false
                }
                //console.log(alert)
                this.showModal = true;
                break;
              }
              case(404): {
                this.alert={
                  messaggio:undefined,
                  avviso:"Errore durante l'aggiunta del curriculum. Documenti vuoti!",
                  tipo: Opzioni.ErroreFileVuoti,
                  showAnnulla: false
                }
                //console.log(alert)
                this.showModal = true;
                break;
              }
            }
            }).catch(error=>{
              console.log("ERROR addCVsFromIDDipendente(...) call: "+error);
            });
          break;
        }
        case(Opzioni.ErroreCVsDuplicati):{
          this.ShowForm()
          break;
        }
        case(Opzioni.ErroreFileVuoti):{
          this.ShowForm()
          break;
        }
      }
    }
    this.showModal = false
  }
  

  removeFile(file: FileUpload) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
    if(this.selectedFiles.length===0) {
      this.isAtLeastOneCv=false;
    }
  }

  ShowForm(){    
    this.isAtLeastOneCv=false;
    this.selectedFiles = [];
    this.showForm=!this.showForm;
    this.submitted=false
  }
}
