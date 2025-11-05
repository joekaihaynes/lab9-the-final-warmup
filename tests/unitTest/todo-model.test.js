import { describe, it, expect, beforeEach } from 'vitest';
import {TodoModel}  from '../../src/model/todo-model.js';

describe('TodoModel', () => {
  let model;

  beforeEach(() => {
    const fakeStorage = {
      save: () => {},
      load: () => [],
    };
    model = new TodoModel(fakeStorage);
  });

  it('adds a new todo', () => {
    model.addTodo('Buy milk');
    expect(model.todos.length).to.equal(1);
    expect(model.todos[0].text).to.equal('Buy milk');
  });

  it('toggles completion status', () => {
    model.addTodo('Task');
    const id = model.todos[0].id;
    model.toggleComplete(id);
    expect(model.todos[0].completed).to.be.true;
  });

  it('clears completed todos', () => {
    model.addTodo('Task');
    const id = model.todos[0].id;
    model.toggleComplete(id);
    model.clearCompleted();
    expect(model.todos.length).to.equal(0);
  });
});
