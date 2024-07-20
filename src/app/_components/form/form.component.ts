import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewToDo, ToDo } from '../../models/todos';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  @Input() todo: ToDo | null = null;
  todoForm!: FormGroup;
  @Output() newToDo = new EventEmitter<NewToDo>();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      description: new FormControl<string>(this.todo?.description ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      isComplete: new FormControl<boolean>(this.todo?.isComplete ?? false, {
        nonNullable: true
      })
    });
  }

  submitForm() {
    if (this.todoForm.valid) {
      const newToDo: NewToDo = {
        description: this.todoForm.value.description,
        isComplete: this.todoForm.value.isComplete
      }
      this.newToDo.emit(this.todoForm.value);
      this.todoForm.reset();
    }
  }
}
