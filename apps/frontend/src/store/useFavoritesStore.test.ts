
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './useFavoritesStore';
import { PokemonFavorites } from '@/types/data-types';

describe('useFavoritesStore', () => {
  const pikachu: PokemonFavorites = { name: 'Pikachu', sprites: { front_default: null, other: { 'official-artwork': { front_default: null } } }, types: [] };
  const charmander: PokemonFavorites = { name: 'Charmander', sprites: { front_default: null, other: { 'official-artwork': { front_default: null } } }, types: [] };
  const squirtle: PokemonFavorites = { name: 'Squirtle', sprites: { front_default: null, other: { 'official-artwork': { front_default: null } } }, types: [] };
  
  beforeEach(() => {
    // Reset store state before each test
    useFavoritesStore.setState({ favorites: [] });
  });

  it('initial state should have empty favorites array', () => {
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
    expect(favorites.length).toBe(0);
  });

  it('toggle should add a new favorite when not present', () => {    
    useFavoritesStore.getState().toggle(pikachu);
    const { favorites, isFavorite } = useFavoritesStore.getState();  
    expect(favorites.length).toBe(1);   
    expect(favorites[0].name).toEqual('Pikachu');
    expect(isFavorite('Pikachu')).toBe(true);
  });

  it('toggle should remove an existing favorite', () => {
    const { isFavorite, toggle } = useFavoritesStore.getState();
    toggle(pikachu); // add
    toggle(pikachu); // remove
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
    expect(isFavorite('Pikachu')).toBe(false);
  });

  it('removing one favorite leaves others intact', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle(pikachu);
    toggle(charmander);
    toggle(squirtle);
    toggle(charmander); // remove middle
    const { favorites } = useFavoritesStore.getState();
    const names = favorites.map(f => f.name);
    expect(names).toEqual(['Pikachu', 'Squirtle']);
  });  

  it('isFavorite returns correct boolean values', () => {
    const {  isFavorite , toggle } = useFavoritesStore.getState();
    toggle(pikachu);
    toggle(charmander);
    expect(isFavorite('Pikachu')).toBe(true);
    expect(isFavorite('Charmander')).toBe(true);
    expect(isFavorite('Squirtle')).toBe(false);
  });
  
});