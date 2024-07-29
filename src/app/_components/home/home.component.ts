import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewToDo, ToDo } from '../../models/todos';
import { ToDoService } from '../../_services/to-do.service';
import { ToDoComponent } from "../to-do/to-do.component";
import { ToDoModalComponent } from "../to-do-modal/to-do-modal.component";
import { FilterPipe } from "../../pipes/filter.pipe";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, ToDoComponent, ToDoModalComponent, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  isModalOpen: boolean = false;
  todos: ToDo[] = [];
  searchText: string | undefined | null;

  filterForm = new FormGroup({
    searchText: new FormControl<string>('')
  });
  filterFormSubsription: Subscription;

  constructor(private service: ToDoService) {
    this.filterFormSubsription = this.filterForm.valueChanges.subscribe(changes => {
      this.searchText = changes.searchText;
    });

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

  ngOnDestroy() {
    this.filterFormSubsription.unsubscribe();
  }
}
