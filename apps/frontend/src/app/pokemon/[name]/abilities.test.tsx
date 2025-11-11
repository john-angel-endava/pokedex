import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import PokemonAbilitiesPage from './abilities';
import { PokemonAbility } from '@/types/data-types';

const buildAbility = (name: string): PokemonAbility => ({
  ability: { name, url: `https://pokeapi.co/api/v2/ability/${name}` },
  is_hidden: false,
  slot: 1,
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('PokemonAbilitiesPage', () => { 
  it('renders the label "Abilities" and all the abilities passed', () => {
    const names = ['overgrow', 'chlorophyll', 'leaf-guard'];
    render(
      <PokemonAbilitiesPage abilities={names.map(buildAbility)} />
    );
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    names.forEach(n => {
      expect(screen.getByText(n)).toBeInTheDocument();
    });    
  });

  it('only renders the label "Abilities" when the abilities array is empty', () => {
    render(<PokemonAbilitiesPage abilities={[]} />);
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    const container = screen.getByText('Abilities:').parentElement!;
    const texts = Array.from(container.querySelectorAll('p')).map(p => p.textContent);
    // Only the label should be present
    expect(texts).toEqual(['Abilities:']);
  });
});