import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../models/todos';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(todos: ToDo[], searchText: string | undefined | null): ToDo[] {

    if (!todos) {
      return [];
    }

    if (!searchText) {
      return todos;
    }

    searchText = searchText.toLowerCase();

    return todos.filter(({ title }) => title.toLowerCase().includes(searchText));
  }

}
