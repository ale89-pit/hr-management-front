import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CurriculumServiceService } from './curriculum-service.service';

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

  constructor(private curriculumService: CurriculumServiceService) { }
  get data(): EmployeeInterface {
    return this.dataSubject.getValue();
  }

  updateData(newData: EmployeeInterface) {
    newData.curriculum?.forEach(cv=>{
      this.curriculumService.decodeBase64String(cv.curriculum).then(text => {
        cv.pdfText = text
        //console.log("text: "+text+"\nblob: "+cv.curriculum)
      }).catch(error => {
        console.error("Error decoding base64 string:", error);
      });
      cv.modificaCurriculum=false
    });
    this.dataSubject.next(newData);
  }
}