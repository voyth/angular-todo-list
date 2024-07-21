import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewToDo } from '../../models/todos';

@Component({
  selector: 'app-to-do-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './to-do-modal.component.html',
  styleUrl: './to-do-modal.component.scss'
})
export class ToDoModalComponent implements OnInit, OnDestroy {
  todoForm!: FormGroup;
  @Output() newToDo = new EventEmitter<NewToDo>();
  @Output() close = new EventEmitter();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      description: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)]
      }),
      isComplete: new FormControl<boolean>(false, {
        nonNullable: true
      })
    });
  }

  closeModal() {
    this.close.emit();
  }

  saveToDo() {
    if (this.todoForm.valid) {
      this.newToDo.emit(this.todoForm.value);
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    this.todoForm.reset();
  }
}
