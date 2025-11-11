import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SearchInput from './search-input';

const DEBOUNCE_MS = 300;

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
    vi.useRealTimers();
  });

  it('debounces input and calls onDebouncedChange once with trimmed/lowercased value', () => {
    const onDebouncedChange = vi.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onDebouncedChange={onDebouncedChange} />
    );
    const input = getByPlaceholderText('Search by name…') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Squirtle' } });
    expect(onDebouncedChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_MS - 50);
    });
    expect(onDebouncedChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(onDebouncedChange).toHaveBeenCalledTimes(1);
    expect(onDebouncedChange).toHaveBeenCalledWith('squirtle');
  });

  it('uses only the final value after rapid successive changes', () => {
    const onDebouncedChange = vi.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onDebouncedChange={onDebouncedChange} />
    );
    const input = getByPlaceholderText('Search by name…');

    fireEvent.change(input, { target: { value: 'Fir' } });
    fireEvent.change(input, { target: { value: 'Fire' } });
    fireEvent.change(input, { target: { value: 'Fire ' } });

    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_MS);
    });

    expect(onDebouncedChange).toHaveBeenCalledTimes(1);
    expect(onDebouncedChange).toHaveBeenCalledWith('fire');
  });  
});