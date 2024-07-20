import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { NewToDo, ToDo } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private API_URL: string = environment.apiUrl;
  private http = inject(HttpClient);

  getAllTodos() {
    return this.http.get<ToDo[]>(this.API_URL);
  }

  getTodoById(id: number) {
    return this.http.get<ToDo>(this.API_URL + id);
  }

  saveTodo(newTodo: NewToDo) {
    return this.http.post<ToDo>(this.API_URL, newTodo);
  }

  updateTodo(id: number, changedTodo: ToDo) {
    return this.http.put<ToDo>(this.API_URL + id, changedTodo);
  }

  removeTodo(id: number) {
    return this.http.delete<ToDo>(this.API_URL + id);
  }
}
