import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo as TodoModel } from '../models/todo.models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/items-list`);
  }

  getTodoById(id: string) {
    return this.http.get<TodoModel>(`${this.apiUrl}/items-list/${id}`);
  }

  addTodo(todo: TodoModel) {
    return this.http.post<TodoModel>(`${this.apiUrl}/items`, todo);
  }

  updateTodo(itemId: string, todo: TodoModel) {
    return this.http.put<TodoModel>(`${this.apiUrl}/change-status/${itemId}`, todo);
  }

  deleteTodo(itemId: string) {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`);
  }
}
