import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalContent, ModalInterface } from '../interface/modalInterface';
import { CommonModule } from '@angular/common';

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
    tipo: undefined
  }
  ritorno:ModalInterface={
    conferma: undefined,
    tipo: undefined
  }
  @Output() close: EventEmitter<ModalInterface> = new EventEmitter<ModalInterface>();

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
