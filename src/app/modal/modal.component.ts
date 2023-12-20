import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal() {
    this.close.emit();
  }

}
