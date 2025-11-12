'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./card.module.css";
import { PokemonFavorites } from '@/types/data-types';
import FavoriteButton from '../favorites/favorite-button';

interface PokemonCardProps {
  pokemon: PokemonFavorites;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (    
      <Link href={`/pokemon/${pokemon?.name}`} style={{ textDecoration: 'none', color: 'black', display: 'block', height: '100%' }}>
      <Card>
        <FavoriteButton pokemon={pokemon} />
        <CardContent className={styles.card} style={{ textAlign: 'center' }}>
              <h3 style={{ textTransform: 'capitalize' }}>{pokemon?.name}</h3>
              {pokemon?.sprites?.front_default && (
              <Image
                src={pokemon?.sprites?.front_default}
                alt={pokemon?.name}
                width={120}
                height={120}
                style={{ marginBottom: '1rem' }}
              />
                 )}
              <Stack direction="row" spacing={1} justifyContent="center">
                {
                  pokemon?.types.map((typeInfo, index) => (
                    <Chip key={typeInfo.type.name} label={typeInfo.type.name} color={index === 0 ? 'primary' : 'secondary'} />
                  ))
                }
              </Stack>
        </CardContent>
      </Card>
    </Link>  
  );
}