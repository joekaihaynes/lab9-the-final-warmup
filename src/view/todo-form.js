import { LitElement, html, css } from 'lit';

/**
 * TodoForm - Input form for adding new todos
 *
 * Renders a text input and submit button. Emits an `add-todo` custom event
 * when a non-empty todo is submitted. Resets the input after submission.
 *
 * @fires TodoForm#add-todo - Dispatched when a new todo is added
 * @fires TodoForm#input - Internal input change (not custom)
 */
export class TodoForm extends LitElement {
  static properties = {
    inputValue: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.25rem;
    }

    form {
      display: flex;
      gap: 0.5rem;
    }

    input {
        flex: 1;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 0.5rem;
        outline: none;
        transition: border-color 0.3s;
    }

    input:focus {
      border-color: #667eea;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #5568d3;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.inputValue = '';
  }

  /**
   * Handles form submission.
   * Prevents default form behavior, trims input, and dispatches `add-todo` event
   * if the text is non-empty. Clears the input afterward.
   *
   * @param {Event} e - Native form submit event
   * @fires TodoForm#add-todo
   */
  handleSubmit(e) {
    e.preventDefault();
    const text = this.inputValue.trim();

    if (text) {
      this.dispatchEvent(new CustomEvent('add-todo', {
        detail: { text },
        bubbles: true,
        composed: true
      }));

      this.inputValue = '';
    }
  }

  /**
   * Updates `inputValue` state when the user types in the input field.
   *
   * @param {InputEvent} e - Input event from the text field
   */
  handleInput(e) {
    this.inputValue = e.target.value;
  }

  /**
   * Renders the form with input and submit button.
   * Button is disabled when input is empty or whitespace.
   *
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          .value=${this.inputValue}
          @input=${this.handleInput}
          aria-label="New todo"
          autofocus
        />
        <button type="submit" ?disabled=${!this.inputValue.trim()}>
          Add
        </button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);
