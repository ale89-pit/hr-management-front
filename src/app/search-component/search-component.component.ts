
import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule,FormControl,ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employeeInterface';
import { CommonModule } from '@angular/common';
import { SkillsInterface } from '../interface/skillsInteface';
import { TipskillServiceService } from '../service/tipskill-service.service';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent implements OnInit {

  @Output() searchInput:EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';
  @Output() employees: EventEmitter<EmployeeInterface[]> = new EventEmitter<EmployeeInterface[]>();
  
  submitted : boolean = false;
  allSkills: SkillsInterface[] = [];
  showSkills: boolean = false;
  selectedSkill: string[] = [];
 
  formFilter: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    skills: new FormArray([])
  })

  get skills(): FormArray {
    return this.formFilter.get('skills') as FormArray
  }
  

  constructor(private employeeService: EmployeeServiceService, private skillsService: TipskillServiceService, private formBuilder: FormBuilder) {
   
  
   }
   
   
   ngOnInit(){
  
    this.formFilter = this.formBuilder.group({
      startDate : ['',Validators.required],
      endDate  : ['',Validators.required],
      skills: this.formBuilder.array([],[ Validators.required, this.atAlmostOneSelected]), 
    })
    this.skillsService.getAllSkills().then((skill) => {
      
      
      skill.map(element =>{
        this.allSkills.push(element);
        const skillFormControls = this.formBuilder.control({
         value: false,disabled: false,
         
        },)
        element.isChecked=false;
        this.skills.push(skillFormControls);});
    });
   }

   atAlmostOneSelected : ValidatorFn = (controlAbstract: AbstractControl) : ValidationErrors | null => {
    console.log("abstgrack: "+controlAbstract.value)
    let atAlmostOneSelected = this.skills.controls.filter(control => control.value).length > 0
    console.log("atAlmostOneSelected: "+atAlmostOneSelected)
     return  atAlmostOneSelected ? null : { 'atAlmostOneSelected': true }

   }
   handlerCheckboxselection() {
    this.selectedSkill = [];
    this.skills.controls.filter((control ,index)=> {
      this.allSkills[index].isChecked = control.value;
      if(this.allSkills[index].tipologiaSkill !== undefined && this.allSkills[index].tipologiaSkill !== null && this.allSkills[index].isChecked === true) {
        let skillName = this.allSkills[index].tipologiaSkill
        this.selectedSkill.push(skillName);
      }
      
    });


    // console.log( this.skills.controls.filter(control => console.log(control.value.tipologiaSkill)));
  this.skills.controls.filter(control => control.value)
  this.searchWithFilter();
    console.log(this.allSkills);
  console.log(this.selectedSkill);
}

   
    
  search() {
    this.searchInput.emit(this.searchText);
   this.employeeService.filterBynameSurname(this.searchText, 0).then((emp) => {
    
    this.employees.emit(emp.content);
    
  });
}
  searchWithFilter() {
    this.submitted = true
      if(this.formFilter.invalid){
        console.log("invalid")
        console.log(this.formFilter.errors)
        return
      }

      this.employeeService.filterEmployeebetweenDateandSkill(this.formFilter.value.startDate, this.formFilter.value.endDate,this.selectedSkill).then((emp) => {
        
      
        this.employees.emit(emp);
  
      })
    
      
    };
 

  


}