import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../../src/controller/todo-app.js'; // defines <todo-list>

describe('TodoList Component', () => {
  it('renders empty state when no todos exist', async () => {
    const el = await fixture(html`<todo-list .todos=${[]}></todo-list>`);
    const emptyState = el.shadowRoot.querySelector('.empty-state');
    expect(emptyState).to.exist;
  });

  it('renders todo-item elements for each todo', async () => {
    const todos = [
      { id: 1, text: 'Task 1', completed: false },
      { id: 2, text: 'Task 2', completed: false }
    ];
    const el = await fixture(html`<todo-list .todos=${todos}></todo-list>`);
    const items = el.shadowRoot.querySelectorAll('todo-item');
    expect(items.length).to.equal(2);
  });
});
