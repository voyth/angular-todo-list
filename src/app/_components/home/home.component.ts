import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NewToDo, ToDo } from '../../models/todos';
import { ToDoService } from '../../_services/to-do.service';
import { ToDoComponent } from "../to-do/to-do.component";
import { ToDoModalComponent } from "../to-do-modal/to-do-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, ToDoComponent, ToDoModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean = false;
  todos: ToDo[] = [];

  private service = inject(ToDoService);

  ngOnInit(): void {
    this.getAllToDos();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  getAllToDos() {
    this.service.getAllTodos().subscribe((todos) => {
      this.todos = todos;
      console.table(this.todos);
    });
  }

  submitForm(newToDo: NewToDo) {
    this.service.saveTodo(newToDo).subscribe((savedTodo) => {
      this.todos = [...this.todos, savedTodo];
      console.table(this.todos);
    });
  }

  saveEditedToDo(editedToDo: ToDo) {
    this.service.updateTodo(editedToDo.id, editedToDo).subscribe(() => {
      this.getAllToDos();
    });
  }

  removeToDo(todoId: number) {
    this.service.removeTodo(todoId).subscribe(() => {
      this.getAllToDos();
    })
  }
}
