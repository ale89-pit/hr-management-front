import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{
  errore!: string;

  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    if(!(this.errore=this.route.snapshot.params['error']))  {
      this.errore='Error: page not found';
    }
  }

}
