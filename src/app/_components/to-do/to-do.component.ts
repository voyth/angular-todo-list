import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewToDo, ToDo } from '../../models/todos';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  @Input() todo: ToDo | null = null;;
  isEditing: boolean = false;
  @Output() editedToDo = new EventEmitter();
  @Output() completeToDo = new EventEmitter();
  @Output() removeToDo = new EventEmitter();

  toggleEditToDo() {
    this.isEditing = !this.isEditing;
  }

  saveChanges(changedTodo: NewToDo) {
    this.editedToDo.emit({ ...changedTodo, id: this.todo?.id })
    this.toggleEditToDo();
  }

  removeTodo() {
    this.removeToDo.emit(this.todo?.id);
  }

  completeTodo() {
    const completedToDo = { ...this.todo, isComplete: true };
    this.completeToDo.emit(completedToDo);
  }
}
