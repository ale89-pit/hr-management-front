import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';
import { EmployeeInterface } from '../interface/employee-interface';
import { RefNationalitaInterface } from '../interface/ref-nazionalita-interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  modificaAreaPersonale:boolean;
  route:ActivatedRoute=inject(ActivatedRoute);
  employeeService=inject(EmployeeServiceService)
  employee:EmployeeInterface|undefined;
  nazionalitaList:RefNationalitaInterface[]|undefined;
  id=Number(this.route.snapshot.params['id']);

  constructor(private router: Router)  {
    this.employeeService.getEmployeeById(this.id).then(x=>{this.employee=x;});
    this.employeeService.getAllRefNaionalita().then(x=>{this.nazionalitaList=x});
    this.modificaAreaPersonale=false;
  }

  ModificaDipendente(evento:Event)  {
    //this.employeeService.patchEmployeeById((<HTMLInputElement>evento.target).json()).then();
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
