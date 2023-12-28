import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { RefNationality } from '../interface/refNationalitaInterface';
import { NationalityServiceService } from '../service/nationality-service.service';
import{AbstractControl,FormBuilder, FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import moment from 'moment';
import { DetailsCurriculumComponent } from "../details-curriculum/details-curriculum.component";
import { DataSharingService } from '../service/data-sharing-service.service';
import { DetailsCompetenzeComponent } from '../details-competenze/details-competenze.component';
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';

@Component({
    selector: 'app-details',
    standalone: true,
    templateUrl: './details-employee.component.html',
    styleUrl: './details-employee.component.css',
    imports: [CommonModule, ReactiveFormsModule, ModalComponent, DetailsCurriculumComponent,DetailsCompetenzeComponent]
})
export class DetailsEmployeeComponent implements OnInit{  
  alert:ModalContent={
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined
  }
  public modificaAreaPersonale!: boolean;
  public route:ActivatedRoute=inject(ActivatedRoute);
  public id!: number;
  public employee:EmployeeInterface= {
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
  public nazionalitaList:RefNationality[]|undefined;
  public form = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    dataDiNascita: new FormControl(''),
    matricola: new FormControl('1'),
    citta: new FormControl(''),
    indirizzo: new FormControl(''),
    refNazionalita: new FormControl(''),
  });
  public submitted!: boolean;
  public showModal!: boolean;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private nazionalityService: NationalityServiceService,
    private employeeService: EmployeeServiceService,
    private dataSharingService: DataSharingService,
  ) {}
  
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
    this.id=Number(this.route.snapshot.params['id']);
    this.submitted=false;
    this.showModal = false;
    this.modificaAreaPersonale=false;

    this.dataSharingService.data$.subscribe((newEmployee) => {
      this.employee = newEmployee;
    });
    this.nazionalityService.gettAllNationality().then(x=>{
      this.nazionalitaList=x;
    }).catch(error=>{
      console.log("ERROR gettAllNationality(...) call: "+error);
    });
    this.employeeService.getEmployeeById(this.id).then((x)=>{
      this.dataSharingService.updateData(x);
      this.employee=x
    }).catch(error=>{
      console.log("ERROR getEmployeeById(...) call: "+error);
    });   

    this.form =this.formBuilder.group({
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
    this.alert={
      messaggio:"Vuoi continuare?",
      avviso: "Attenzione stai per modificare i dati personali del dipendente",
      tipo: Opzioni.Cancella
    }
    this.showModal = true;    
  }

  ModificaArea():void  {
    this.modificaAreaPersonale=!this.modificaAreaPersonale;    
  }

  CancellaDipendete() {
    this.alert={
      messaggio:"Vuoi continuare?",
      avviso: "Attenzione la cancellazione del dipendente comporta la cancellazione di tutti i cv e le competenze collegate",
      tipo: Opzioni.Cancella
    }
    this.showModal = true;
  }

  closeModal(conferma:ModalInterface){
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Cancella):{
          this.employeeService.deleteEmployeeById(this.employee.idDipendente).then(response=>{
            //if(resposne.ok) è equivalente a
            if(response.status==200)
            {
              //alert("Dipendente cancellato!");
              this.router.navigate(['']);
            }
          }).catch(error=>{
            console.log("ERROR deleteEmployeeById(...) call: "+error);
          });
          break;
        }
        case(Opzioni.Modifica):{
          this.submitted=false;
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
          //console.log(this.employee)
          //console.log(this.dataSharingService.employee);
          //console.log(this.form.value);
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
          }).catch(error=>{
            console.log("ERROR patchEmployeeById(...) call: "+error);
          });
          break;
        }
        
      }
        
    }
    this.showModal = false
  }
}
