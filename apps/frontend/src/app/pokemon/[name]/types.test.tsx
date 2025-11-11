import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import PokemonTypesPage from './types';
import { PokemonType } from '@/types/data-types';

const buildType = (name: string, slot: number = 1): PokemonType => ({
  slot,
  type: { name, url: `https://pokeapi.co/api/v2/type/${name}` },
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('PokemonTypesPage', () => {  
  it('renders the Types label an each type as a MUI Chip component', () => {
    const names = ['grass', 'poison'];
    render(<PokemonTypesPage types={names.map((name, i) => buildType(name, i + 1))} />);
    expect(screen.getByText('Types:')).toBeInTheDocument();
    names.forEach(n => {
      expect(screen.getByText(n)).toBeInTheDocument();
    });
    // Count chip roots (excluding the Typography label)
    const chipRoots = document.querySelectorAll('.MuiChip-root');
    expect(chipRoots.length).toBe(names.length);
  });

  it('when given an empty array only the label is rendered (no chips)', () => {
    render(<PokemonTypesPage types={[]} />);
    const label = screen.getByText('Types:');
    expect(label).toBeInTheDocument();
    // Parent stack should have no chip roots
    const stack = label.parentElement!;
    expect(stack.querySelectorAll('.MuiChip-root').length).toBe(0);
  });
});