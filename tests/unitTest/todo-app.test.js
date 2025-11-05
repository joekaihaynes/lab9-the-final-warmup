import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { TodoApp } from '../../src/controller/todo-app.js';

describe('TodoApp Component', () => {
  it('renders the app title', async () => {
    const el = await fixture(html`<todo-app></todo-app>`);
    const title = el.shadowRoot.querySelector('h1');
    expect(title.textContent).to.contain('My Tasks');
  });

  it('starts with an empty todo list', async () => {
    const el = await fixture(html`<todo-app></todo-app>`);
    expect(el.todos).to.be.an('array').that.is.empty;
  });

  it('adds a todo when handleAddTodo is called', async () => {
    const el = await fixture(html`<todo-app></todo-app>`);
    el.handleAddTodo({ detail: { text: 'Test Todo' } });
    expect(el.todos.length).to.equal(1);
    expect(el.todos[0].text).to.equal('Test Todo');
  });

  it('clears all todos when handleClearAll is confirmed', async () => {
    const el = await fixture(html`<todo-app></todo-app>`);
    el.handleAddTodo({ detail: { text: 'Todo 1' } });
    window.confirm = () => true; // mock user confirmation
    el.handleClearAll();
    expect(el.todos.length).to.equal(0);
  });
});
