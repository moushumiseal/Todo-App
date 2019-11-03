import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () =>{
    let todoItem : Todo = new Todo({
      title: 'Read book',
      complete: true 
    });
    expect(todoItem.title).toEqual('Read book');
    expect(todoItem.complete).toEqual(true);
  });
});
