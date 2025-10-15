import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo as TodoModel } from '../models/todo.models';
import { ApiResponse } from '../models/api-response.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private apiUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoModel[]> {
    return this.http.get<ApiResponse<TodoModel[]>>(`${this.apiUrl}/items-list`)
      .pipe(
        map(response => response.data)
      );
  }

  getTodoById(id: string): Observable<TodoModel> {
    return this.http.get<ApiResponse<TodoModel>>(`${this.apiUrl}/items-list/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<ApiResponse<TodoModel>>(`${this.apiUrl}/items`, todo)
      .pipe(
        map(response => response.data)
      );
  }

  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<ApiResponse<TodoModel>>(`${this.apiUrl}/change-status/${todo.id}`, todo)
      .pipe(
        map(response => response.data)
      );
  }

  changeStatus(itemId: string, isCompleted: boolean): Observable<string> {

    const dto = {
      itemId: itemId,
      isCompleted: isCompleted
    };
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/change-status`, dto)
      .pipe(
        map(response => response.data)
      );
    // return this.http.put(`${this.apiUrl}/change-status`, dto, { responseType: 'text' });
  }

  deleteTodo(itemId: string): Observable<string> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/items/${itemId}`)
      .pipe(
        map(response => response.data)
      );
  }
}
