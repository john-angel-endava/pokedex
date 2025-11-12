'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CircularProgress, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import cardStyles from '../../../components/card/card.module.css';
import styles from './detail.module.css';
import { fetchPokemonByName} from '../../../lib/poke-api';
import { PokemonDetail } from '@/types/data-types';
import PokemonSpritePage from './sprite';
import PokemonTypesPage from './types';
import PokemonStatsPage from './stats';
import PokemonAbilitiesPage from './abilities';
import FavoriteButton from '@/components/favorites/favorite-button';

export default function PokemonDetailsPage() { 
    const { name } = useParams() as { name: string };
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

    useEffect(() => {
      async function fetchData() {
        try {
          if (!name) {
            return;
          }
          const result = await fetchPokemonByName(name);
          setPokemon(result);
        } catch (error) {
          console.error(`Error fetching Pokémon ${name}:`, error);
        }
      }
      fetchData();
    }, [name]);

    if(!pokemon) {
      return (
        <main className={styles.detail}> 
          <CircularProgress size="120px" />
        </main>
      );
    }
    
    return (
      <main className={styles.detail}>        
          <Card>
            <CardContent className={cardStyles.card}>
              <Grid container spacing={2}>
                <Grid size={4} alignSelf={"center"}>
                  <PokemonSpritePage name={pokemon.name} sprites={pokemon.sprites} />
                </Grid>
                <Grid size={8} container>
                  <Grid size={12}>
                    <Stack direction={"row"}>
                      <h1 style={{ textTransform: "capitalize" }}>
                        {pokemon?.name}
                      </h1>
                      <FavoriteButton 
                        pokemon={{name: pokemon?.name, sprites: pokemon?.sprites, types: pokemon?.types}}
                      />
                    </Stack>                    
                  </Grid>
                  <Grid size={12}>
                    <PokemonTypesPage types={pokemon.types} />                    
                  </Grid>
                  <Grid size={12}>
                    <PokemonAbilitiesPage abilities={pokemon.abilities} />                    
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1">
                      Height: {pokemon?.height}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1">
                      Weight: {pokemon?.weight}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <PokemonStatsPage stats={pokemon.stats} />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>       
      </main>
    );     
    
}

