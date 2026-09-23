import { describe, expect, it, vi, afterEach } from 'vitest';
import { addParamsToUrl, num2String, parseUrlParams } from '../src/utils';
import throttle from '../src/utils/throttle';

describe('num2String', () => {
  it('pads a number to the requested width', () => {
    expect(num2String(7)).toBe('07');
    expect(num2String(7, 4)).toBe('0007');
  });

  it('leaves a number that is already long enough', () => {
    expect(num2String(123, 2)).toBe('123');
    expect(num2String(12, 2)).toBe('12');
  });

  it('honours a custom fill character', () => {
    expect(num2String(5, 3, ' ')).toBe('  5');
  });
});

describe('addParamsToUrl', () => {
  it('adds the first parameter with a ?', () => {
    expect(addParamsToUrl('https://example.com/a', 'id', '1')).toBe('https://example.com/a?id=1');
  });

  it('appends a further parameter with an &', () => {
    expect(addParamsToUrl('https://example.com/a?x=1', 'id', '2')).toBe(
      'https://example.com/a?x=1&id=2'
    );
  });

  it('returns the url untouched when the name is missing', () => {
    expect(addParamsToUrl('https://example.com', '', '1')).toBe('https://example.com');
  });
});

describe('parseUrlParams', () => {
  it('reads the query string into an object', () => {
    expect(parseUrlParams('https://example.com/a?id=1&name=bob')).toEqual({
      id: '1',
      name: 'bob'
    });
  });

  it('returns an empty object when there is no query string', () => {
    expect(parseUrlParams('https://example.com/a')).toEqual({});
    expect(parseUrlParams('')).toEqual({});
  });

  it('skips malformed pairs', () => {
    expect(parseUrlParams('https://example.com?a=1&broken&b=2')).toEqual({ a: '1', b: '2' });
  });
});

describe('throttle', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs immediately by default, then suppresses until the window passes', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 500);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(501);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('forwards its arguments to the wrapped function', () => {
    const fn = vi.fn();
    throttle(fn, 0)('a', 1);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });
});
