import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../models/todos';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(todos: any[], searchText: string): any[] {

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
