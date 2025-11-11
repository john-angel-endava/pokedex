'use client';
import { create } from 'zustand';

type FavoritesInfo = {
    name: string;    
}

interface FavoritesState {
    favorites: FavoritesInfo[];
    toggle: (name: string) => void;
    isFavorite: (name: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({    
    favorites: [],
    toggle: (name: string) => {
        const currentFavorites = get().favorites;
        const index = currentFavorites.findIndex(fav => fav.name === name);
        const updatedFavorites: FavoritesInfo[] = [...currentFavorites];
        
        if (index !== -1) {             
            updatedFavorites.splice(index,1);    
        } else { 
            updatedFavorites.push({ name });
        }
        
        set(() => ({ favorites: updatedFavorites }));
    },
    isFavorite: (name: string) => {
        const currentFavorites = get().favorites;
        return currentFavorites.some(favorite => favorite.name === name);
    }
}));