import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { RefNationality } from '../interface/refNationalitaInterface';
import { NationalityServiceService } from '../service/nationality-service.service';
import{AbstractControl, FormBuilder, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import moment from 'moment';
import { DetailsCurriculumComponent } from "../details-curriculum/details-curriculum.component";
import { DataSharingService } from '../service/data-sharing-service.service';
import { DetailsTipskillComponent } from '../details-tipskill/details-tipskill.component';

@Component({
    selector: 'app-details',
    standalone: true,
    templateUrl: './details-employee.component.html',
    styleUrl: './details-employee.component.css',
    imports: [CommonModule, ReactiveFormsModule, ModalComponent, DetailsCurriculumComponent,DetailsTipskillComponent]
})
export class DetailsEmployeeComponent {
  modificaAreaPersonale:boolean;
  route:ActivatedRoute=inject(ActivatedRoute);
  nazionalityService=inject(NationalityServiceService);
  employeeService=inject(EmployeeServiceService);  
  id=Number(this.route.snapshot.params['id']);
  employee:EmployeeInterface= {
    idDipendente:this.id,
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
  nazionalitaList:RefNationality[]|undefined;
  form = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    dataDiNascita: new FormControl(''),
    matricola: new FormControl('1'),
    citta: new FormControl(''),
    indirizzo: new FormControl(''),
    refNazionalita: new FormControl(''),
  });
  submitted = false;
  showModal = false;
  dataSharingService:DataSharingService=inject(DataSharingService);
  constructor(private router: Router, private FormBuilder:FormBuilder) {    
    this.employeeService.getEmployeeById(this.id).then(x=>{this.employee=x;});
    this.nazionalityService.gettAllNationality().then(x=>{this.nazionalitaList=x});
    this.modificaAreaPersonale=false;
    this.passID();
  }
  
  passID() {
    this.dataSharingService.employeeID=this.id;
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

    ngOnInit()  {
        this.form = this.FormBuilder.group({
        nome: ['',[Validators.required,Validators.minLength(3)]],
        cognome: ['',[Validators.required,Validators.minLength(3)]],
        dataDiNascita: ['',[Validators.required,this.dateValidation(18)]],
        matricola: [''],
        citta: ['',Validators.required],
        indirizzo: ['',Validators.required],
        refNazionalita: ['',Validators.required],
      })
    }

  ModificaDipendente()  {
    this.submitted = true
    if(this.form.invalid){
      return
    }
    let employee:EmployeeInterface= {
      idDipendente: this.employee.idDipendente,
      nome: this.form.value.nome,
      cognome: this.form.value.cognome,
      dataDiNascita: this.form.value.dataDiNascita,
      matricola: this.employee.matricola,
      citta: this.form.value.citta,
      indirizzo: this.form.value.indirizzo,
      rowExist:undefined,
      skills:undefined,
      refNazionalita:{
        idRefNazionalita:10,
        nazionalita:undefined,
      },
      curriculum:undefined
    }
    console.log(employee)
    console.log(this.form.value);
    this.employeeService.patchEmployeeById(employee).then(response=>{
      //if(resposne.ok) è equivalente a
      if(response.status==200){
        alert("Dipendente modificato!");
        if(employee.nome) this.employee.nome=employee.nome;
        if(employee.cognome) this.employee.cognome=employee.cognome;
        if(employee.dataDiNascita) this.employee.dataDiNascita=employee.dataDiNascita;
        if(employee.matricola) this.employee.matricola=employee.matricola;
        if(employee.citta) this.employee.citta=employee.citta;
        if(employee.indirizzo) this.employee.indirizzo=employee.indirizzo;
        if(employee.refNazionalita) this.employee.refNazionalita=employee.refNazionalita;
        this.modificaAreaPersonale=false;
      }
    })
  }

  ModificaArea():void  {
    if(this.modificaAreaPersonale==false)  {
      this.modificaAreaPersonale=true;
      return;
    }
    this.modificaAreaPersonale=false;    
  }

  CancellaDipendete() {
    this.employeeService.deleteEmployeeById(this.id).then(response=>{
      //if(resposne.ok) è equivalente a
      if(response.status==200)
      {
        alert("Dipendente cancellato!");
        this.router.navigate(['']);
      }
    });
  }

  closeModal(){
    console.log("ciao")
    this.showModal = false
  }
}
