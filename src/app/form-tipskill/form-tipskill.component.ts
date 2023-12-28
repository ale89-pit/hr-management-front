import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TipskillServiceService } from '../service/tipskill-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';
import { DataSharingService } from '../service/data-sharing-service.service';
import { SkillsInterface } from '../interface/skillsInteface';
import { ModalComponent } from '../modal/modal.component';
import { EmployeeInterface } from '../interface/employeeInterface';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';


@Component({
  selector: 'app-form-tipskill',
  standalone: true,
  imports: [CommonModule,ModalComponent,ReactiveFormsModule],
  templateUrl: './form-tipskill.component.html',
  styleUrl: './form-tipskill.component.css'
})
export class FormTipskillComponent implements OnInit{
  @Input() cvID!:number;
  alert:ModalContent={
    messaggio:"empty message",
    avviso: "Error: initialize message",
    tipo: undefined
  }
  showForm!: boolean;
  public showModal!: boolean;
  allTipskills!:SkillsInterface[];
  idTipskills!:number[];
  selectedItems!: SkillsInterface[];
  employee!: EmployeeInterface;
  form!:FormGroup;
  isAtLeastOneCheckboxSelected!: boolean;

  constructor(private employeeService: EmployeeServiceService,
    private router: Router,
    private tipskillService: TipskillServiceService,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.dataSharingService.data$.subscribe((newEmployee) => {
      this.employee = newEmployee;
    });
    this.employee=this.dataSharingService.data;
    this.showForm=false;
    this.showModal = false;
    this.tipskillService.getAllSkills().then(x=>{
      this.tipskillService.getTipskillsByEmployeeIDCvID(this.employee.idDipendente,this.cvID).then(y=>{
        this.allTipskills=x;//console.log(this.allTipskills);
        this.allTipskills.forEach(z=>{
          z.isChecked=false;
          //avrei preferito usare includes ma typescript mi dice che ha problemi con undefined type
          z.isCheckedByDefault=y.some(item => item.tipologiaSkill === z.tipologiaSkill);//console.log(z);
          const checkbox = this.formBuilder.control({ value: false, disabled: z.isCheckedByDefault??false});
          this.checkboxes.push(checkbox);
          this.updateCheckboxSelection();
        });//console.log(this.allTipskills);
      }).catch(error=>{
        console.log("ERROR getTipskillsByEmployeeIDCvID(...) call: "+error);
      });
    }).catch(error=>{
      console.log("ERROR getAllSkills(...) call: "+error);
    });
    this.idTipskills=[];
    this.isAtLeastOneCheckboxSelected=false;
    this.form = this.formBuilder.group({
      selectAll: false,
      checkboxes: this.formBuilder.array([], Validators.required)
    });
  }
  
  get checkboxes(): FormArray {
    return this.form.get('checkboxes') as FormArray;
  }

  toggleSelectAll() {
    const selectAllValue = this.form.get('selectAll')?.value;
    this.checkboxes.controls.forEach(control =>{
      if(!control.disabled) {
        control.setValue(selectAllValue)
      }
    });
    this.updateCheckboxSelection();
  }

  updateCheckboxSelection() {
    const selectedCheckboxes = this.checkboxes.controls.filter(control => control.value);
    this.isAtLeastOneCheckboxSelected = selectedCheckboxes.length > 0;
  }

  submitForm() {
    if (this.form.valid && this.isAtLeastOneCheckboxSelected) {
      this.alert={
        messaggio:"Vuoi continuare?",
        avviso: "Attenzione stai per modificare le  competenze a cui il curriculum fa riferimento",
        tipo: Opzioni.Aggiungi
      }
      this.showModal = true;
      this.idTipskills=[];
      //console.log(this.form.value);
    }
  }

  aggiungiTipskill(){
   
  }

  ShowForm(){
    this.showForm=!this.showForm;
  }

  closeModal(conferma:ModalInterface){
    if(conferma.conferma){
      switch(conferma.tipo){
        case(Opzioni.Aggiungi):{
          let j=0;
          for(let i=0;i<this.allTipskills.length;i++){
            if(!this.allTipskills[i].isCheckedByDefault){
              this.allTipskills[i].isChecked=this.form.value.checkboxes[j];//console.log(this.form.value.checkboxes[j]);
              j++;
            }
          };//console.log(this.allTipskills);
          this.allTipskills.forEach(x=>{
            if(x.isChecked){
              this.idTipskills.push(x.idTipskill);
            }
          });//console.log(this.idTipskills);
          console.log(this.cvID)
          this.tipskillService.addSkillsFromIDCV_2(this.cvID,this.idTipskills).then(response=>{
            if(response.status==200)
            {
              this.employeeService.getEmployeeById(this.dataSharingService.data.idDipendente).then((x)=>{
                this.dataSharingService.updateData(x);
                this.employee=x
              }).catch(error=>{
                console.log("ERROR getEmployeeById(...) call: "+error);
              });
              this.router.navigate(['/details/'+this.dataSharingService.data.idDipendente]);
            }
          })
          break;
        }
      }
    }
    this.showModal = false
  }

  /* esmpio di sviluppo
  form: FormGroup;
  isAtLeastOneCheckboxSelected: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      selectAll: false,
      checkboxes: this.formBuilder.array([], Validators.required)
    });

    this.addCheckbox(); // Aggiungi una casella di controllo iniziale
  }

  get checkboxes(): FormArray {
    return this.form.get('checkboxes') as FormArray;
  }

  addCheckbox() {
    const checkbox = this.formBuilder.control(false);
    this.checkboxes.push(checkbox);
    this.updateCheckboxSelection();
  }

  removeCheckbox(index: number) {
    this.checkboxes.removeAt(index);
    this.updateCheckboxSelection();
  }

  toggleSelectAll() {
    const selectAllValue = this.form.get('selectAll').value;
    this.checkboxes.controls.forEach(control => control.setValue(selectAllValue));
    this.updateCheckboxSelection();
  }

  updateCheckboxSelection() {
    const selectedCheckboxes = this.checkboxes.controls.filter(control => control.value);
    this.isAtLeastOneCheckboxSelected = selectedCheckboxes.length > 0;
  }

  submitForm() {
    if (this.form.valid && this.isAtLeastOneCheckboxSelected) {
      console.log('Form submitted successfully');
      console.log(this.form.value);
    } else {
      console.log('Form validation failed');
    }
  }
  */
}
