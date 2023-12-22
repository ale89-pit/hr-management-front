import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public employeeID: number=-1;
  public curriculumID: number=-1;

  constructor() { }
}