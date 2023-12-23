import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetenzeServiceService {
  public url:string="http://localhost:8080/competenze"
  constructor() { }

  async deleteSkillByIdEmployeeIdTipskill(idDipendente:Number,idTipskill:Number): Promise<any> {
    let url=this.url+`/deleteByIdDipendenteIdCompetenza?dipendenteId=${idDipendente}&tipskillId=${idTipskill}`;
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
