import { describe, expect, it } from 'vitest';
import { prototypeName } from './page';

describe('Romedo Ventures foundation', () => {
  it('exposes the prototype identity to the root page', () => {
    expect(prototypeName).toBe('Romedo Ventures');
  });
});
