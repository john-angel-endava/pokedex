'use client';
import { PokemonFavorites } from '@/types/data-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: PokemonFavorites[];
    toggle: (pokemon: PokemonFavorites) => void; 
    isFavorite: (name: string) => boolean;
    _hasHydrated: boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: [],
      toggle: (pokemon: PokemonFavorites) => {
        const currentFavorites = get().favorites;
        const index = currentFavorites.findIndex(
          (favorite) => favorite?.name === pokemon?.name
        );
        const updatedFavorites: PokemonFavorites[] = [...currentFavorites];

        if (index !== -1) {
          updatedFavorites.splice(index, 1);
        } else {
          updatedFavorites.push(pokemon);
        }

        set(() => ({ favorites: updatedFavorites }));
      },
      isFavorite: (name: string) => {
        const currentFavorites = get().favorites;
        return currentFavorites.some((favorite) => favorite?.name === name);
      },
      _hasHydrated: false,
    }),
    {
      name: 'favorites-storage',
      onRehydrateStorage: (state) => {
        if(state){
          state._hasHydrated = true;
        }
      }
    }
  )
);
    