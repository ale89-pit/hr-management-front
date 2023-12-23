import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() messaggio!: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  okCloseModal() {
    this.close.emit(true)
  }
  notOkCloseModal() {
    this.close.emit(false)
  }

}
