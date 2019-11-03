import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TodoDataService]
  }));

  it('should be created', () => {
    const service: TodoDataService = TestBed.get(TodoDataService);
    expect(service).toBeTruthy();
  });

  describe('#getAllTodos()', () => {
    it('should return empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service : TodoDataService) => {
      let todo1 = new Todo({
        title: 'Clean room',
        complete: false
      });

      let todo2 = new Todo({
        title: 'Read book',
        complete: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should automatically assign an incrementing id', inject([TodoDataService], (service : TodoDataService) => {
      let todo1 = new Todo({
        title: 'Clean room',
        complete: false
      });

      let todo2 = new Todo({
        title: 'Read book',
        complete: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteById(id)', () => {
    it('should remove todo with corresponding id', inject([TodoDataService], (service : TodoDataService) => {
      let todo1 = new Todo({
        title: 'Clean room',
        complete: false
      });

      let todo2 = new Todo({
        title: 'Read book',
        complete: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not remove todo with id that does not exist', inject([TodoDataService], (service : TodoDataService) => {
      let todo1 = new Todo({
        title: 'Clean room',
        complete: false
      });

      let todo2 = new Todo({
        title: 'Read book',
        complete: true
      });

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateById(id, values)', () => {
    it('should return todo with corresponding id and updated data', inject([TodoDataService], (service : TodoDataService) => {
      let todo = new Todo({
        title: 'Clean room',
        complete: false
      });

      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(1, {
        title: 'Clean new room'
      });
      expect(updatedTodo.title).toEqual('Clean new room');
    }));

    it('should return null todo', inject([TodoDataService], (service : TodoDataService) => {
      let todo = new Todo({
        title: 'Clean room',
        complete: false
      });

      service.addTodo(todo);
      let updatedTodo = service.updateTodoById(2, {
        title: 'Clean new room'
      });
      expect(updatedTodo).toEqual(null);
    }));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return updated todo with reversed complete status', inject([TodoDataService], (service : TodoDataService) => {
      let todo = new Todo({
        title: 'Clean room',
        complete: false
      });

      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(false);
    }));
  });
});
