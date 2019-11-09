import { Component } from '@angular/core';
import { TodoDataService} from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  newTodo: Todo = new Todo();
  constructor(private todoDataService: TodoDataService){
  }

  toggleTodoComplete(todo: Todo){
    this.todoDataService.toggleTodoComplete(todo);
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  remove(todo: Todo){
    this.todoDataService.deleteTodoById(todo.id);
  }

  getTodos(){
    return this.todoDataService.getAllTodos();
  }

}
