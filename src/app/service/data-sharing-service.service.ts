import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public employeeID: number|undefined;
  public curriculumID: number|undefined;

  constructor() { }
}