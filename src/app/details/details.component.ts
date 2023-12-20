import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { RefNationality } from '../interface/refNationalitiInterface';
import { NationalityServiceService } from '../service/nationality-service.service';
import{AbstractControl, FormBuilder, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import moment from 'moment';
import { EmployeeDTOInterfaceUpdate } from '../interface/employeeDTOInterfaceUpdate';
@Component({
  selector: 'app-details',
  standalone: true,  
  imports: [CommonModule,ReactiveFormsModule,ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  modificaAreaPersonale:boolean;
  route:ActivatedRoute=inject(ActivatedRoute);
  nazionalityService=inject(NationalityServiceService);
  employeeService=inject(EmployeeServiceService);
  employee:EmployeeInterface={
    idDipendente: 0,
    nome: '',
    cognome: '',
    dataDiNascita: '',
    matricola: '',
    rowExist: 0,
    citta: '',
    indirizzo: '',
    skills: [],
    refNazionalita: {id:0,nazionalita:''},
    curriculum: []
  };
  nazionalitaList:RefNationality[]|undefined;
  id=Number(this.route.snapshot.params['id']);
  form = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    dataDiNascita: new FormControl(''),
    matricola: new FormControl('1'),
    citta: new FormControl(''),
    indirizzo: new FormControl(''),
    refNazionalita: new FormControl(''),
  });
  constructor(private router: Router, private FormBuilder:FormBuilder) { 
    this.employeeService.getEmployeeById(this.id).then(x=>{this.employee=x;});
    this.nazionalityService.gettAllNationality().then(x=>{this.nazionalitaList=x});
    this.modificaAreaPersonale=false;
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
        nome: ['',[Validators.required]],
        cognome: ['',[Validators.required]],
        dataDiNascita: ['',[Validators.required,this.dateValidation(18)]],
        matricola: [''],
        citta: ['',Validators.required],
        indirizzo: ['',Validators.required],
        refNazionalita: ['',Validators.required],
      })
    }

  ModificaDipendente()  {
    let employee: EmployeeDTOInterfaceUpdate = {
      idDipendente: this.employee.idDipendente,
      nome: this.form.value.nome ?? '',
      cognome: this.form.value.cognome ?? '',
      dataDiNascita: this.form.value.dataDiNascita?? '',
      matricola: this.form.value.matricola ?? '',
      citta: this.form.value.citta ?? '',
      indirizzo: this.form.value.indirizzo ?? '',
      refNazionalita: this.form.value.refNazionalita  ??'',
      rowExist: this.employee.rowExist
    };
    this.employeeService.patchEmployeeById(employee).then(data=>console.log(data));
    //alert("Dipendente modificato!");
  }

  ModificaArea():void  {
    if(this.modificaAreaPersonale==false)  {
      this.modificaAreaPersonale=true;
      return;
    }
    this.modificaAreaPersonale=false;    
  }

  CancellaDipendete() {
    this.employeeService.deleteEmployeeById(this.id).then(data=>(console.log(data)));
    alert("Dipendente cancellato!");
    this.router.navigate(['']);
    // window.location.assign("https://localhost:4200/");//se metto paradossalmente un altro sito ci vado senza problemi, peccato...perchè in linea di massima funzionerebbe
  }

}
