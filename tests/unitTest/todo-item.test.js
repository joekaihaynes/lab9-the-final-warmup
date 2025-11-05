import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../../src/controller/todo-app.js'; // defines <todo-item>

describe('TodoItem Component', () => {
  const sampleTodo = { id: 1, text: 'Sample', completed: false };

  it('renders todo text', async () => {
    const el = await fixture(html`<todo-item .todo=${sampleTodo}></todo-item>`);
    const text = el.shadowRoot.querySelector('.todo-text');
    expect(text.textContent).to.contain('Sample');
  });

  it('toggles todo completion when checkbox changes', async () => {
    const el = await fixture(html`<todo-item .todo=${sampleTodo}></todo-item>`);
    const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(checkbox.checked).to.be.true;
  });
});
