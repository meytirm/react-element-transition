import { expect, test } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';


test('custom matchers', () => {
    expect.extend(matchers)
})