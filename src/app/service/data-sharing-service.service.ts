import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeInterface } from '../interface/employeeInterface';

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

  get data(): EmployeeInterface {
    return this.dataSubject.getValue();
  }

  updateData(newData: EmployeeInterface) {
    this.dataSubject.next(newData);
  }
}