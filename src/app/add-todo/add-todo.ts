import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoService } from '../services/todo';
import { Todo as TodoModel } from '../models/todo.models';

@Component({
  selector: 'app-add-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.html',
  styleUrls: ['./add-todo.scss']
})

export class AddTodo {
  newTodo: Partial<TodoModel> = {
    title: '',
    description: '',
    isCompleted: false
  };

  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  @ViewChild('todoForm') todoForm!: NgForm;
  @Output() todoItemAddedEventEmitter = new EventEmitter<TodoModel>();

  constructor(private todoService: TodoService) { }

  addTodoItem() {
    debugger;
    // Clear previous messages
    this.clearMessages();

    // If title is empty do not add
    if (!this.newTodo.title?.trim()) {
      this.errorMessage = 'Please enter a title for your todo';
      return;
    }

    this.isSubmitting = true;

    const todoItemToAdd: TodoModel = {
      id: '', // backend assigns
      title: this.newTodo.title!,
      description: this.newTodo.description || '',
      isCompleted: this.newTodo.isCompleted || false
    };

    this.todoService.addTodo(todoItemToAdd).subscribe({
      next: (addedToDoItem: TodoModel) => {
        debugger;
        this.todoItemAddedEventEmitter.emit(addedToDoItem);
        this.successMessage = 'Todo item added successfully!';
        this.isSubmitting = false;

        // Reset form data and validation state
        this.newTodo = {
          title: '',
          description: '',
          isCompleted: false
        };

        // Reset form validation state after a small delay to ensure DOM is updated
        setTimeout(() => {
          if (this.todoForm) {
            this.todoForm.resetForm(this.newTodo);
          }
        }, 0);

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: unknown) => {
        console.error('Error adding todo item:', err);
        this.errorMessage = 'Failed to add todo item. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  clearForm() {
    this.newTodo = {
      title: '',
      description: '',
      isCompleted: false
    };
    this.clearMessages();

    // Reset the form validation state
    if (this.todoForm) {
      this.todoForm.resetForm(this.newTodo);
    }
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}