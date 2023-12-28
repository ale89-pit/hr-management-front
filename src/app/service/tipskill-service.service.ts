import { Injectable } from '@angular/core';
import { SkillsInterface } from '../interface/skillsInteface';

@Injectable({
  providedIn: 'root'
})
export class TipskillServiceService {
  public url:string="http://localhost:8080/tipskill"
  constructor() { }

  async deleteSkillById(id:Number): Promise<any> {
    let url=this.url+`/cancellaskill?id=${id}`;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getAllSkills(): Promise<SkillsInterface[]> {
    let url=this.url+`/listaskill`;
    const response=await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json()??[];
  }

  async getTipskillsByEmployeeIDCvID(dipendenteID:number,cvID:number): Promise<SkillsInterface[]> {
    let url=this.url+`/getTipskillsByEmployeeIDCvID?dipendenteId=${dipendenteID}&cvId=${cvID}`;
    const response= await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json()??[];
  }

  async addSkillsFromIDCV_2(id_curriculum:number,idTipskill:number[]): Promise<any> {
    let url=this.url+`/esercizio_3/addSkillsFromIDCV_2/${id_curriculum}?idTipskill=`;
    for(let i=0;i<idTipskill.length;i++){
      if(i!=idTipskill.length-1)
        url=url+`${idTipskill[i]},`;
      else
        url=url+`${idTipskill[i]}`
    }
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
