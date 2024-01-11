import { Component, inject,Output,EventEmitter,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators,FormsModule} from '@angular/forms';
import { RefNationality } from '../interface/refNationalitaInterface';
import { NationalityServiceService } from '../service/nationality-service.service';
import { EmployeeDTOInterface } from '../interface/employeeDTOInterface';
import { EmployeeServiceService } from '../service/employee-service.service';
import { ModalComponent } from '../modal/modal.component';
import moment from 'moment';
import { ModalContent } from '../interface/modalInterface';
import { Route, Router, Routes } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ModalComponent,FormsModule],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit {
  refNationality : Observable<RefNationality[]> | undefined;
  private subscription: Subscription | undefined
  natList : RefNationality[] = [];
  currentRoute!: Route
  showNatForm: boolean = false;
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  natService : NationalityServiceService = inject(NationalityServiceService);
  employeeService : EmployeeServiceService = inject(EmployeeServiceService); 
  submitted = false;
  showModal = false;
  alert:ModalContent = {
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined
  };
  newNationality = "";

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
   
    this.getNatList();
    
  }

openNatForm(){
  console.log(this.showNatForm);
  this.showNatForm = !this.showNatForm;
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
 
  excludeOptionValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const selectedValue = control.value;
  
    // Aggiungi qui la tua logica specifica per escludere un'opzione
    if (selectedValue === 'Aggiungi Nazionalità') {
      return { excludeOption: true };
    }
  
    return null; // Nessun errore di validazione
  };

  handleChange(event: any){
    
    if(event.target.value === "Aggiungi Nazionalità"){
      this.showNatForm = true;
    }else{
      this.showNatForm = false;
    }
  }
  

  ngOnInit(){
    this.form = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(3)]],
      cognome: ['',[Validators.required,Validators.minLength(3)]],
      dataDiNascita: ['',[Validators.required,this.dateValidation(18)]],
      matricola: ['1'],
      citta: ['',Validators.required],
      indirizzo: ['',Validators.required],
      rowExist: [1],
      refNazionalita: ['',[Validators.required,this.excludeOptionValidator]],
    })
   
    this.subscription = this.refNationality?.subscribe((nat)=>{
      this.natList = this.getNatList();
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
        this.alert = {
          messaggio: 'Dati inseriti correttamente',
          avviso: undefined,
          tipo: undefined
        }
        
        
      }
    })
  }

  addNazionalita(){
    this.natService.addNationality(this.newNationality).then((response)=>{
      if(response.status === 200){

      this.alert = {
        messaggio: 'Dati inseriti correttamente',
        avviso: 'Premi Ok per continuare',
        tipo: undefined
      }
      this.showModal = true
      this.getNatList()
      this.showNatForm = false
    }else if (response.status === 208){
      this.alert = {
        messaggio: 'Nazionalità esistente',
        avviso: 'Premi Ok per continuare',
        tipo: undefined
      }
      this.showModal = true
    }
    },(error)=>{
    alert("Errore" + error)
    })
  }
  getNatList(): RefNationality[] {
    this.natService.gettAllNationality().then((nat)=>{
      
        nat.sort((a, b) => {
        const nazionalitaA = a.nazionalita || '';
        const nazionalitaB = b.nazionalita || '';
        return nazionalitaA.localeCompare(nazionalitaB, 'en', { sensitivity: 'base' });
      });
      this.natList = nat
      
    })
    
    return this.natList
  }

  closeModal(){
    console.log("chiusura form")
    this.showForm.emit(false)
    this.showModal = false;
    
  }
}