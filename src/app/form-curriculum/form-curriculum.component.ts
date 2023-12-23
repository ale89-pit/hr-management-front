import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumServiceService } from '../service/curriculum-service.service';
import { DataSharingService } from '../service/data-sharing-service.service';
import { FileUpload } from '../interface/fileUpload';
import { EmployeeInterface } from '../interface/employeeInterface';


@Component({
  selector: 'app-form-curriculum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-curriculum.component.html',
  styleUrls: ['./form-curriculum.component.css']
})
export class FormCurriculumComponent implements OnInit{
  employee!:EmployeeInterface;
  public selectedFiles: FileUpload[]=[]

  constructor(private dataSharingService: DataSharingService,
    private curriculumService: CurriculumServiceService,
    ) {  }

    ngOnInit(): void {
      this.employee = this.dataSharingService.data;
      this.dataSharingService.data$.subscribe((newEmployee) => {
        this.employee = newEmployee;
      });
    }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const fileUpload: FileUpload = { file: fileList[i], progress: 0 };
      this.selectedFiles.push(fileUpload);
    }
  }

  uploadFiles() {
    if(this.selectedFiles.length === 0) {
      alert('Please select a file');
      return;
    }
    this.curriculumService.addCVsFromIDDipendente(this.dataSharingService.data.idDipendente, this.selectedFiles)
      .then((response) => {
        if (response.ok) {
          alert('Files uploaded successfully');
        }
      });
  }

  removeFile(file: FileUpload) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
