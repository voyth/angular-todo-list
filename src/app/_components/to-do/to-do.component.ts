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

  toggleModal() {
    this.isEditing = !this.isEditing;
  }

  saveChanges(changedTodo: NewToDo) {
    const verify = this.areObjectsEqual(changedTodo, this.todo);

    if (!verify) {
      this.editedToDo.emit({ ...changedTodo, id: this.todo?.id })
    }
  }

  private areObjectsEqual(obj1: NewToDo, obj2: ToDo | undefined) {
    const isTitleEqual = obj1.title === obj2?.title;
    const isDescriptionEqual = obj1.description === obj2?.description;
    const isCompleteEqual = obj1.isComplete === obj2?.isComplete;

    return isTitleEqual && isDescriptionEqual && isCompleteEqual;
  }

  removeTodo() {
    this.removeToDo.emit(this.todo?.id);
  }

  completeTodo() {
    this.completeToDo.emit({ ...this.todo, isComplete: true });
  }
}
