import { Inject, Injectable } from '@angular/core';

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
}
