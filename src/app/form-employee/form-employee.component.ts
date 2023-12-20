import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RefNationality } from '../interface/refNationalitiInterface';
import { NationalityServiceService } from '../service/nationality-service.service';
import { EmployeeDTOInterface } from '../interface/employeeDTOInterface';
import { EmployeeServiceService } from '../service/employee-service.service';
import { ModalComponent } from '../modal/modal.component';
import moment from 'moment';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ModalComponent],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent {
  refNationality : RefNationality[] = []
  natService : NationalityServiceService = inject(NationalityServiceService);
  employeeService : EmployeeServiceService = inject(EmployeeServiceService); 
  submitted = false;
  showModal = false;

  form = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    dataDiNascita: new FormControl(''),
    matricola: new FormControl('1'),
    citta: new FormControl(''),
    indirizzo: new FormControl(''),
    rowExist: new FormControl(1),
    refNazionalita: new FormControl(''),

  })
 
  constructor(private formBuilder: FormBuilder) {
    this.natService.gettAllNationality().then((nat)=>{
      this.refNationality = nat
      console.log(this.refNationality)
    })  
  }

  dateValidation(minAge: number){ 
  return (control:AbstractControl):{[key:string]:any} | null => {
    const inputValue = control.value;
    if(inputValue){
      const date = new Date(inputValue);
      const today = moment();
      const age = today.diff(date, 'years');
      if(age < minAge){
        return { 'minAge': { requiredAge: minAge, actualAge: age } };
      }
    }
    return null
  }
  }
  

  ngOnInit(){
    this.form = this.formBuilder.group({
      nome: ['',[Validators.required]],
      cognome: ['',[Validators.required]],
      dataDiNascita: ['',[Validators.required,this.dateValidation(18)]],
      matricola: ['1'],
      citta: ['',Validators.required],
      indirizzo: ['',Validators.required],
      rowExist: [1],
      refNazionalita: ['',Validators.required],
    })
  }

  addEmployee(){
    this.submitted = true
    if(this.form.invalid){
      return
    }
    let employeeDTO: EmployeeDTOInterface = {
      nome: this.form.value.nome ?? '',
      cognome: this.form.value.cognome ?? '',
      dataDiNascita: this.form.value.dataDiNascita?? '',
      matricola: this.form.value.matricola ?? '',
      citta: this.form.value.citta ?? '',
      indirizzo: this.form.value.indirizzo ?? '',
      rowExist: this.form.value.rowExist ?? 1,
      refNazionalita: this.form.value.refNazionalita?? '',
    };

    this.employeeService.addEmployee(employeeDTO).then((emp)=>{
      if(emp){
        this.showModal = true
      }
    })
  }

  closeModal(){
    console.log("ciao")
    this.showModal = false
  }
}
