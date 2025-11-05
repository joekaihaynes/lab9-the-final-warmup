import { describe, it, expect } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import '../../src/controller/todo-app.js'; // defines <todo-form>

describe('TodoForm Component', () => {
  it('renders an input and button', async () => {
    const el = await fixture(html`<todo-form></todo-form>`);
    const input = el.shadowRoot.querySelector('input');
    const button = el.shadowRoot.querySelector('button');
    expect(input).to.exist;
    expect(button).to.exist;
  });

  it('emits add-todo event on valid submit', async () => {
    const el = await fixture(html`<todo-form></todo-form>`);
    const input = el.shadowRoot.querySelector('input');
    input.value = 'Do homework';
    input.dispatchEvent(new InputEvent('input'));
    setTimeout(() => el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit')));
    const event = await oneEvent(el, 'add-todo');
    expect(event.detail.text).to.equal('Do homework');
  });
});
