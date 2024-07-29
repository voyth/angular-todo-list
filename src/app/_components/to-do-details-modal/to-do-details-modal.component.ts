import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../models/todos';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-details-modal',
  standalone: true,
  imports: [DatePipe],
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
