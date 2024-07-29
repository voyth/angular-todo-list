import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../models/todos';

@Component({
  selector: 'app-to-do-details-modal',
  standalone: true,
  imports: [],
  templateUrl: './to-do-details-modal.component.html',
  styleUrl: './to-do-details-modal.component.scss'
})
export class ToDoDetailsModalComponent {
  @Input() todo: ToDo | undefined;
  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }
}
