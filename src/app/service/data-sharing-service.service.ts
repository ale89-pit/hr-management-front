import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CurriculumServiceService } from './curriculum-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private dataSubject = new BehaviorSubject<EmployeeInterface>(
    {
      idDipendente:-1,
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
  );
  public data$ = this.dataSubject.asObservable();

  constructor(private curriculumService: CurriculumServiceService,
    private sanitizer: DomSanitizer) { }
  get data(): EmployeeInterface {
    return this.dataSubject.getValue();
  }

  updateData(newData: EmployeeInterface) {
    newData.curriculum?.forEach(cv=>{
      if(this.curriculumService.isTxtFile(cv.curriculum)){//console.log(cv.pdfText)
        this.curriculumService.base64ToStringForTxt(cv.curriculum).then(text => {
          cv.pdfText = text
          //console.log("text: "+text+"\nblob: "+cv.curriculum)
        }).catch(error => {
          console.error("Error decoding base64 string:", error);
        });
      }
      if(this.curriculumService.isPdfFile(cv.curriculum)){
        const blob=this.curriculumService.base64ToStringForPdf(cv.curriculum);//console.log(blob)
        cv.pdfUrl=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));//console.log(cv.pdfUrl)
      }
      cv.modificaCurriculum=false
    });
    this.dataSubject.next(newData);
  }
}