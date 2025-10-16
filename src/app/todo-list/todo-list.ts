import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTodo } from '../add-todo/add-todo';
import { TodoService } from '../services/todo';
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

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

    this.fetchTodos();
  }

  fetchTodos(): void {
    console.log('🔄 fetchTodos() called - starting to fetch...');
    this.isLoading = true;

    this.todoService.getTodos().subscribe(
      (todos: TodoModel[]) => {
        debugger;
        console.log('📥 Fetched todos from API:', todos);
        console.log('📋 First todo structure:', todos[0]);
        console.log('📊 Number of todos received:', todos.length);
        console.log('🔍 Todos with completed status:', todos.map(t => ({ title: t.title, isCompleted: t.isCompleted })));

        this.todos = todos;
        this.isLoading = false;

        console.log('✅ fetchTodos() completed - UI should update now');
      },
      (error: unknown) => {
        console.error('❌ Error in fetchTodos():', error);
        this.errorMessage = 'Error fetching todos';
        this.isLoading = false;
      }
    );
  }

  onTodoAdded(newTodoItem: TodoModel): void {
    this.todos.push(newTodoItem); // ✅ Update list
  }

  markAsCompleted(todo: TodoModel): void {
    console.log('🎯 markAsCompleted called for todo:', todo.title, 'Current status:', todo.isCompleted);
    console.log('🔍 Full todo object:', todo);
    console.log('🗝️ Object keys:', Object.keys(todo));

    if (todo.isCompleted) {
      console.log('⚠️ Todo is already completed, returning early');
      return; // Prevent double updates
    }

    // Try to find the correct ID property
    const todoId = todo.id || (todo as any).itemId || (todo as any).Id || (todo as any).todoId;

    if (!todoId) {
      console.error('❌ No ID found on todo object!');
      return;
    }

    console.log('📤 Sending status change request to API...');
    console.log('📋 Payload:', { itemId: todoId, isCompleted: true });

    this.todoService.changeStatus(todoId, true).subscribe({
      next: (response) => {
        console.log('✅ API SUCCESS! Response:', response);
        console.log('🔄 Now refreshing the todo list...');

        // Refresh immediately - no delay needed
        this.fetchTodos();
      },
      error: (err) => {
        console.error('❌ API FAILED:', err);
        console.error('❌ Status Code:', err.status);
        console.error('❌ Error Body:', err.error);
        console.error('❌ Full Error Object:', JSON.stringify(err, null, 2));

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
