import { LitElement, html, css } from 'lit';
import './todo-item.js';

/**
* TodoList – Renders a scrollable list of todos with empty state.
*
* @fires CustomEvent - No events (pure view)
*
* @attr {Array<Object>} todos - Array of todo objects from controller

*/

export class TodoList extends LitElement {
  static properties = {
    todos: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
    }

    .empty-state {
      text-align: center;
      padding: 2.5rem 1.25rem;
      color: white;
      font-size: 1.125rem;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .list-container {
      max-height: 31.25rem;
      overflow-y: auto;
    }

    /* Custom scrollbar */
    .list-container::-webkit-scrollbar {
      width: .5rem;
    }

    .list-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: .25rem;
    }

    .list-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: .25rem;
    }

    .list-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  `;

  constructor() {
    super();
    this.todos = [];
  }

  /**
   * Renders the todo list or empty state.
   */
  render() {
    if (this.todos.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <p>No todos yet. Add one above!</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">
        ${this.todos.map(todo => html`
          <todo-item .todo=${todo}></todo-item>
        `)}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
