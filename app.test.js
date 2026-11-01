import test from 'node:test';
import assert from 'node:assert/strict';
import { add } from './app.js';

test('add returns the sum of two positive numbers', () => {
  assert.strictEqual(add(2, 3), 5);
  assert.strictEqual(add(10, 20), 30);
});

test('add handles zero and negative numbers correctly', () => {
  assert.strictEqual(add(5, 0), 5);
  assert.strictEqual(add(0, 0), 0);
  assert.strictEqual(add(-4, -6), -10);
  assert.strictEqual(add(7, -3), 4);
});
