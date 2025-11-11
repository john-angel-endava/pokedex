
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
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
    useFavoritesStore.getState().toggle('Pikachu');
    const { favorites, isFavorite } = useFavoritesStore.getState();  
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual({ name: 'Pikachu' });
    expect(isFavorite('Pikachu')).toBe(true);
  });

  it('toggle should remove an existing favorite', () => {
    const { isFavorite, toggle } = useFavoritesStore.getState();
    toggle('Pikachu'); // add
    toggle('Pikachu'); // remove
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
    expect(isFavorite('Pikachu')).toBe(false);
  });


  it('removing one favorite leaves others intact', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle('Bulbasaur');
    toggle('Charmander');
    toggle('Squirtle');
    toggle('Charmander'); // remove middle
    const { favorites } = useFavoritesStore.getState();
    const names = favorites.map(f => f.name);
    expect(names).toEqual(['Bulbasaur', 'Squirtle']);
  });
  

  it('isFavorite returns correct boolean values', () => {
    const {  isFavorite , toggle } = useFavoritesStore.getState();
    toggle('Bulbasaur');
    toggle('Charmander');
    expect(isFavorite('Bulbasaur')).toBe(true);
    expect(isFavorite('Charmander')).toBe(true);
    expect(isFavorite('Squirtle')).toBe(false);
  });
/*
  test('toggle and isFavorite are case sensitive', () => {
    const { toggle, isFavorite } = useFavoritesStore.getState();
    toggle('Eevee');
    toggle('eevee');
    const names = useFavoritesStore.getState().favorites.map(f => f.name);
    expect(names).toEqual(['Eevee', 'eevee']);
    expect(isFavorite('Eevee')).toBe(true);
    expect(isFavorite('eevee')).toBe(true);
    expect(isFavorite('EEVEE')).toBe(false);
  });

  test('favorites array reference changes when adding', () => {
    const prevRef = useFavoritesStore.getState().favorites;
    useFavoritesStore.getState().toggle('Mew');
    const newRef = useFavoritesStore.getState().favorites;
    expect(prevRef).not.toBe(newRef);
  });

  test('favorites array reference changes when removing', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle('Mew');
    const prevRef = useFavoritesStore.getState().favorites;
    toggle('Mew'); // remove
    const newRef = useFavoritesStore.getState().favorites;
    expect(prevRef).not.toBe(newRef);
    expect(newRef).toEqual([]);
  });

  test('no duplicate after add/remove/add sequence', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle('Snorlax'); // add
    toggle('Snorlax'); // remove
    toggle('Snorlax'); // add again
    const { favorites } = useFavoritesStore.getState();
    expect(favorites.length).toBe(1);
    expect(favorites[0]).toEqual({ name: 'Snorlax' });
  });

  test('object instance is new when re-adding same favorite', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle('Ditto');
    const firstObj = useFavoritesStore.getState().favorites.find(f => f.name === 'Ditto');
    toggle('Ditto'); // remove
    toggle('Ditto'); // add again
    const secondObj = useFavoritesStore.getState().favorites.find(f => f.name === 'Ditto');
    expect(firstObj).not.toBeUndefined();
    expect(secondObj).not.toBeUndefined();
    expect(firstObj).not.toBe(secondObj);
  });

  test('isFavorite updates correctly after multiple operations', () => {
    const { toggle, isFavorite } = useFavoritesStore.getState();
    toggle('Articuno');  // add
    toggle('Zapdos');    // add
    toggle('Articuno');  // remove Articuno
    toggle('Moltres');   // add
    expect(isFavorite('Articuno')).toBe(false);
    expect(isFavorite('Zapdos')).toBe(true);
    expect(isFavorite('Moltres')).toBe(true);
  });
  */
});