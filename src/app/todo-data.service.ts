import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  /**
   * Placeholder for last id to
   * simulate auto-increment of ids.
   */
  lastId: number = 0;

  //Placeholder for todos
  todos: Todo[] = [];

  constructor() { 
  }

  //Simulating GET/todos/:id
  getTodoById(id: number) : Todo{
    return this.todos.filter(todo => todo.id == id).pop();
  }

  //Simulating POST/todos
  addTodo(todo: Todo) : TodoDataService{
    if(!todo.id){
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  //Simulating DELETE/todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id != id);
    return this;
  }
  
  //Simulating PUT/todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id); 
    if(!todo){
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  //Toggle update todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {complete: !todo.complete});
    return updatedTodo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }
}
