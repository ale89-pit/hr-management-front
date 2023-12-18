import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RefNationality } from '../interface/refNationalitiInterface';
import { NationalityServiceService } from './nationality-service.service';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent {
  refNationality : RefNationality[] = []
  natService : NationalityServiceService = inject(NationalityServiceService); 

  constructor() {
    this.natService.gettAllNationality().then((nat)=>{
      this.refNationality = nat
      console.log(this.refNationality)
    })  
  }

}
