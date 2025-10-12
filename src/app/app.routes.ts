import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { AddTodo } from './add-todo/add-todo';

export const routes: Routes = [];
routes.push({ path: '', component: TodoList });
routes.push({ path: 'add', component: AddTodo });   