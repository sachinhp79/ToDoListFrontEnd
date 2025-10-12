import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTodo } from '../add-todo/add-todo';
import { TodoService } from '../services/todo';
import { Todo as TodoModel } from '../models/todo.models';


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, AddTodo],
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
    this.isLoading = true;

    this.todoService.getTodos().subscribe(
      (todos: TodoModel[]) => {
        this.todos = todos;
        this.isLoading = false;
      },
      (error: unknown) => {
        this.errorMessage = 'Error fetching todos';
        this.isLoading = false;
      }
    );
  }

  onTodoAdded(newTodoItem: TodoModel): void {
    this.todos.push(newTodoItem); // ✅ Update list
  }

}
