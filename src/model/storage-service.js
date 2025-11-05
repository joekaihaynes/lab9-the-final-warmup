/**
 * StorageService - Handles localStorage operations for the TODO app
 */
export class StorageService {
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
  }

  /**
   * Save data to localStorage
   * @param {string} key - Data key
   * @param {any} data - Data to save
   */
  save(key, data) {
    try {
      const fk = `${this.storageKey}_${key}`;
      localStorage.setItem(fk, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Data key
   * @param {any} defaultValue - Fallback value
   * @returns {any}
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return defaultValue;
    }
  }

  /**
   * Remove data from localStorage
   * @param {string} key - Data key
   */
  remove(key) {
    try {
      const fullK = `${this.storageKey}_${key}`;
      localStorage.removeItem(fullK);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  }

  /**
   * Clear all data for this app
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
