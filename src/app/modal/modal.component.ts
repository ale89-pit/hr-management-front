import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalContent, ModalInterface, Opzioni } from '../interface/modalInterface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() finestra:ModalContent={
    messaggio: undefined,
    avviso: undefined,
    tipo: undefined,
    showAnnulla: undefined,
  }
  ritorno:ModalInterface={
    conferma: undefined,
    tipo: undefined
  }
  @Output() close: EventEmitter<ModalInterface> = new EventEmitter<ModalInterface>();

  constructor(private currentRoute: Router) {
  if(this.currentRoute.url=='/'){
    this.finestra.showAnnulla = false;
  }
   //console.log(this.currentRoute.url)
  }


  okCloseModal() {
    this.ritorno = {
      conferma: true,
      tipo: this.finestra.tipo
    }
    this.close.emit(this.ritorno)
  }
  notOkCloseModal() {
    this.ritorno = {
      conferma: false,
      tipo: this.finestra.tipo
    }
    
    this.close.emit(this.ritorno)
  }

}
