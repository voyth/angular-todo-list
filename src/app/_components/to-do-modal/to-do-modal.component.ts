import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewToDo, ToDo } from '../../models/todos';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './to-do-modal.component.html',
  styleUrl: './to-do-modal.component.scss'
})
export class ToDoModalComponent implements OnInit, OnDestroy {
  @Input() todo: ToDo | undefined;
  todoForm!: FormGroup;
  @Output() newToDo = new EventEmitter<NewToDo>();
  @Output() close = new EventEmitter();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      title: new FormControl<string>(this.todo?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      description: new FormControl<string>(this.todo?.description ?? '', {
        nonNullable: true,
        validators: [Validators.maxLength(250)]
      }),
      isComplete: new FormControl<boolean>(this.todo?.isComplete ?? false, {
        nonNullable: true
      }),
      createdAt: new FormControl<Date>(this.todo?.createdAt ?? new Date(), {
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
    }
  }

  ngOnDestroy(): void {
    this.todoForm.reset();
  }
}
