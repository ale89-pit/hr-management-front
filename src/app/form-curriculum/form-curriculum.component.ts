import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumServiceService } from '../service/curriculum-service.service';
import { DataSharingService } from '../service/data-sharing-service.service';
import { FileUpload } from '../interface/fileUpload';
import { EmployeeInterface } from '../interface/employeeInterface';
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';
import { ModalComponent } from '../modal/modal.component';


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
    tipo: undefined
  }
  employee!:EmployeeInterface;
  isAtLeastOneCv!:boolean;
  public selectedFiles: FileUpload[]=[];
  public showModal!: boolean;
  showForm!: boolean

  constructor(private dataSharingService: DataSharingService,
    private curriculumService: CurriculumServiceService
    ) {  }

    ngOnInit(): void {
      this.showForm = false;
      this.showModal = false;
      this.employee = this.dataSharingService.data;
      this.isAtLeastOneCv=false;
      this.dataSharingService.data$.subscribe((newEmployee) => {
        this.employee = newEmployee;
      });
    }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const fileUpload: FileUpload = { file: fileList[i], progress: 0 };
      this.selectedFiles.push(fileUpload);
    }
    this.isAtLeastOneCv=this.selectedFiles.length>0;
  }

  uploadFiles(){
    if(this.selectedFiles.length> 0) {
      this.alert={
        messaggio:"Vuoi aggiungere un nuovo curriculum?",
        avviso:undefined,
        tipo: Opzioni.Aggiungi
      }
      this.showModal = true;
    }
  }
  
  closeModal(conferma:ModalInterface)  {
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Aggiungi):{
          this.curriculumService.addCVsFromIDDipendente(this.dataSharingService.data.idDipendente, this.selectedFiles)
            .then((response) => {
              if (response.ok) {
                alert('Files uploaded successfully');
              }
            }).catch(error=>{
              console.log("ERROR addCVsFromIDDipendente(...) call: "+error);
            });
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
    this.showForm=!this.showForm;
  }
}
