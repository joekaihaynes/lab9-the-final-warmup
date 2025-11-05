import { LitElement, html, css } from 'lit';
import { TodoModel } from '../model/todo-model.js';
import { StorageService } from '../model/storage-service.js';
import '../view/todo-form.js';
import '../view/todo-list.js';

/**
 * TodoApp - Main application component
 * Coordinates between Model and View controller using MVC pattern.
 * Manages the state of todos and renders the complete UI.
 */
export class TodoApp extends LitElement {
  static properties = {
    todos: { state: true }
  };

  static styles = css`
    :host {
      display: block;
    }

    .app-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 0.625rem 2.5rem rgba(0, 0, 0, 0.2);
        padding: 2rem;
        max-width: 37.5rem;
        margin: 0 auto;
    }

    h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 2rem;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: .5rem;
      margin-bottom: 1.25rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size:0.75rem;
      color: #666;
      text-transform: uppercase;
    }

    .actions {
      display: flex;
      gap: .5rem;
      margin-top: 1.25rem;
    }

    button {
        flex: 1;
        padding: 0.625rem 1rem;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .clear-completed {
      background: #ff9800;
      color: white;
    }

    .clear-completed:hover {
      background: #f57c00;
    }

    .clear-all {
      background: #f44336;
      color: white;
    }

    .clear-all:hover {
      background: #da190b;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .footer {
        margin-top: 1.25rem;
        padding-top: 1.25rem;
        border-top: 1px solid #e0e0e0;
        text-align: center;
        color: #666;
        font-size: 0.75rem;
    }
  `;

  constructor() {
    super();
    /** @private */
    this.storageService = new StorageService();
    /** @private */
    this.model = new TodoModel(this.storageService);
    /** @type {Array} */
    this.todos = this.model.todos;

    // Subscribe to model changes to trigger re-render
    this.model.subscribe(() => {
      this.todos = [...this.model.todos];
    });
  }


  /**
   * Handles adding a new todo from the todo-form component.
   * @param {CustomEvent} e - Event containing todo text in e.detail.text
   */
  handleAddTodo(e) {
    this.model.addTodo(e.detail.text);
  }

  /**
   * Toggles the completion status of a todo item.
   * @param {CustomEvent} e - Event with todo ID in e.detail.id
   */
  handleToggleTodo(e) {
    this.model.toggleComplete(e.detail.id);
  }

  /**
   * Deletes a todo item by ID.
   * @param {CustomEvent} e - Event with todo ID in e.detail.id
   */
  handleDeleteTodo(e) {
    this.model.deleteTodo(e.detail.id);
  }

  /**
   * Updates the text of an existing todo.
   * @param {CustomEvent} e - Event with { id, text } in e.detail
   */
  handleUpdateTodo(e) {
    this.model.updateTodo(e.detail.id, e.detail.text);
  }

  /**
   * Clears all completed todos after user confirmation.
   */
  handleClearCompleted() {
    if (confirm('Clear all completed todos?')) {
      this.model.clearCompleted();
    }
  }

  /**
   * Deletes all todos (both active and completed) after confirmation.
   */
  handleClearAll() {
    if (confirm('Clear ALL todos? This cannot be undone.')) {
      this.model.clearAll();
    }
  }

  /**
   * Renders the full application UI.
   * */
  render() {
    return html`
      <div class="app-container">
        <h1>My Tasks</h1>
        <p class="subtitle">Stay organized and productive</p>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">${this.todos.length}</div>
            <div class="stat-label">Total</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.activeCount}</div>
            <div class="stat-label">Active</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.model.completedCount}</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>

        <todo-form
          @add-todo=${this.handleAddTodo}>
        </todo-form>

        <todo-list
          .todos=${this.todos}
          @toggle-todo=${this.handleToggleTodo}
          @delete-todo=${this.handleDeleteTodo}
          @update-todo=${this.handleUpdateTodo}>
        </todo-list>

        <div class="actions">
          <button
            class="clear-completed"
            @click=${this.handleClearCompleted}
            ?disabled=${this.model.completedCount === 0}>
            Clear Completed
          </button>
          <button
            class="clear-all"
            @click=${this.handleClearAll}
            ?disabled=${this.todos.length === 0}>
            Clear All
          </button>
        </div>

        <div class="footer">
          Lab 9: The final battle!
        </div>
      </div>
    `;
  }
}

customElements.define('todo-app', TodoApp);
