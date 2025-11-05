// tests/unitTest/setup.js
import { fixtureCleanup } from '@open-wc/testing';
import { afterEach } from 'vitest';

// Automatically clean up fixtures after each test
afterEach(() => {
  fixtureCleanup();
});