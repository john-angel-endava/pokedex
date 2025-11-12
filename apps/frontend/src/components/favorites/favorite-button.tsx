'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from "./favorite-button.module.css";
import Stack from '@mui/material/Stack';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { PokemonFavorites } from '@/types/data-types';

interface FavoriteButtonProps {
  pokemon: PokemonFavorites;
};

export default function FavoriteButton({ pokemon }: FavoriteButtonProps) {
    const favoritesStore = useFavoritesStore(state => state);
    const [isFavorite, setIsFavorite] = useState(favoritesStore.isFavorite(pokemon?.name));

  const onToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {    
    favoritesStore.toggle(pokemon);
    e.preventDefault();
    e.stopPropagation(); 
    setIsFavorite(!isFavorite);
  };

  return (
    <Stack className={styles.cardContainer} sx={{ alignItems: "flex-end" }}>
      <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        <IconButton
          aria-label={isFavorite ? "remove favorite" : "add favorite"}
          size='small'
          color='error'
          onClick={onToggleFavorite}
        >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
