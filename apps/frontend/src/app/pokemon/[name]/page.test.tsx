import React from 'react';
import { useParams } from 'next/navigation';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import PokemonDetailsPage from './page';
import type { PokemonDetail, PokemonAbility, PokemonType, PokemonStat } from '@/types/data-types';
import { fetchPokemonByName } from '../../../lib/poke-api';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../../lib/poke-api', () => ({
  fetchPokemonByName: vi.fn(),
}));

// Helper builders
const buildAbility = (name: string): PokemonAbility => ({
  ability: { name, url: `https://pokeapi.co/api/v2/ability/${name}` },
  is_hidden: false,
  slot: 1,
});

const buildType = (name: string, slot = 1): PokemonType => ({
  slot,
  type: { name, url: `https://pokeapi.co/api/v2/type/${name}` },
});

const buildStat = (name: string, base: number): PokemonStat => ({
  base_stat: base,
  effort: 0,
  stat: { name, url: `https://pokeapi.co/api/v2/stat/${name}` },
});

const makePokemonDetail = (id: number, name: string): PokemonDetail => {
  return {
    id,
    name,
    height: 7,
    weight: 69,
    sprites: {
      front_default: `https://img.pokemons/${name}.png`,
        other: {'official-artwork': { front_default: null }}
    },
    abilities: ['overgrow', 'chlorophyll'].map(buildAbility),
    types: ['grass', 'poison'].map((type, i) => buildType(type, i + 1)),
    stats: [
      buildStat('hp', 45),
      buildStat('attack', 49),
      buildStat('defense', 47),
    ],
  };
};

const useParamsMock = vi.mocked(useParams);
const fetchPokemonByNameMock = vi.mocked(fetchPokemonByName);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    // Default mock to a valid name
    useParamsMock.mockReturnValue({ name: 'bulbasaur' });
  });

  it('renders a loading spinner initially', () => {
    fetchPokemonByNameMock.mockResolvedValue(makePokemonDetail(1,'bulbasaur'));
    render(<PokemonDetailsPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('fetches and displays pokemon details after loading', async () => {
    const data = makePokemonDetail(1,'bulbasaur');
    fetchPokemonByNameMock.mockResolvedValue(data);

    render(<PokemonDetailsPage />);

    // Wait for name heading
    const heading = await screen.findByText('bulbasaur');
    expect(heading).toBeInTheDocument();

    // Spinner should disappear
    expect(screen.queryByRole('progressbar')).toBeNull();

    // Height / Weight
    expect(screen.getByText(/Height:/)).toHaveTextContent(`Height: ${data.height}`);
    expect(screen.getByText(/Weight:/)).toHaveTextContent(`Weight: ${data.weight}`);

    // Abilities
    data.abilities.forEach(a => {
      expect(screen.getByText(a.ability.name)).toBeInTheDocument();
    });

    // Types
    data.types.forEach(t => {
      expect(screen.getByText(t.type.name)).toBeInTheDocument();
    });

    // Stats base_stat values present
    data.stats.forEach(s => {
      expect(screen.getByText(String(s.base_stat))).toBeInTheDocument();
    });
    expect(fetchPokemonByNameMock).toHaveBeenCalledWith('bulbasaur');
  });

});