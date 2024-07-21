import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewToDo, ToDo } from '../../models/todos';
import { ToDoModalComponent } from '../to-do-modal/to-do-modal.component';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [ToDoModalComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  @Input() todo: ToDo | undefined;
  isEditing: boolean = false;
  @Output() editedToDo = new EventEmitter();
  @Output() completeToDo = new EventEmitter();
  @Output() removeToDo = new EventEmitter();

  toggleEditToDo() {
    this.isEditing = !this.isEditing;
  }

  saveChanges(changedTodo: NewToDo) {
    this.editedToDo.emit({ ...changedTodo, id: this.todo?.id })
  }

  removeTodo() {
    this.removeToDo.emit(this.todo?.id);
  }

  completeTodo() {
    const completedToDo = { ...this.todo, isComplete: true };
    this.completeToDo.emit(completedToDo);
  }
}
