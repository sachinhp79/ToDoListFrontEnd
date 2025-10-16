import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTodo } from '../add-todo/add-todo';
import { TodoService } from '../services/todo';
import { LoggerService } from '../services/logger-service';
import { Todo as TodoModel } from '../models/todo.models';


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {

  todos: TodoModel[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private todoService: TodoService, private logger: LoggerService) { }

  ngOnInit(): void {

    this.fetchTodos();
  }

  fetchTodos(): void {
    this.logger.debug('🔄 fetchTodos() called - starting to fetch...');
    this.isLoading = true;

    this.todoService.getTodos().subscribe(
      (todos: TodoModel[]) => {
        this.logger.debug('📥 Fetched todos from API:', todos);
        this.todos = todos;
        this.isLoading = false;
        this.logger.debug('✅ fetchTodos() completed - UI should update now');
      },
      (error: unknown) => {
        this.logger.error('❌ Error in fetchTodos():', error);
        this.errorMessage = 'Error fetching todos';
        this.isLoading = false;
      }
    );
  }

  onTodoAdded(newTodoItem: TodoModel): void {
    this.todos.push(newTodoItem); // ✅ Update list
  }

  markAsCompleted(todo: TodoModel): void {
    this.logger.debug('🎯 markAsCompleted called for todo:', todo.title, 'Current status:', todo.isCompleted);
    this.logger.debug('🔍 Full todo object:', todo);
    this.logger.debug('🗝️ Object keys:', Object.keys(todo));

    if (todo.isCompleted) {
      this.logger.warn('⚠️ Todo is already completed, returning early');
      return; // Prevent double updates
    }

    // Try to find the correct ID property
    const todoId = todo.id || (todo as any).itemId || (todo as any).Id || (todo as any).todoId;

    if (!todoId) {
      this.logger.error('❌ No ID found on todo object!');
      return;
    }

    this.logger.debug('📤 Sending status change request to API...');
    this.logger.debug('📋 Payload:', { itemId: todoId, isCompleted: true });

    this.todoService.changeStatus(todoId, true).subscribe({
      next: (response) => {
        this.logger.debug('✅ API SUCCESS! Response:', response);
        this.logger.debug('🔄 Now refreshing the todo list...');

        // Refresh immediately - no delay needed
        this.fetchTodos();
      },
      error: (err) => {
        this.logger.error('❌ API FAILED:', err);
        this.logger.error('❌ Status Code:', err.status);
        this.logger.error('❌ Error Body:', err.error);
        this.logger.error('❌ Full Error Object:', JSON.stringify(err, null, 2));

        // Show detailed error info
        let errorMsg = `Status: ${err.status}\n`;
        errorMsg += `URL: ${err.url}\n`;
        errorMsg += `Message: ${err.message || 'Unknown error'}\n`;
        if (err.error) {
          errorMsg += `Details: ${JSON.stringify(err.error)}`;
        }

        alert('API Error:\n' + errorMsg);
      }
    });
  }
}
