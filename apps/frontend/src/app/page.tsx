'use client';
import React, { useEffect, useState } from "react";
import { Grid, Pagination, PaginationItem, Stack, StyledEngineProvider } from "@mui/material";
import { fetchPokemonList } from "@/lib/poke-api";
import styles from "./page.module.css";
import { PokemonList } from "@/types/pokemon-types";
import PokemonCard from "@/components/card/pokemon-card";


export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonList>({ count: 0, next: null, previous: null, pokemons: [] });
  const [pageCount, setPageCount] = useState(0);
  const [disablePagination, setDisablePagination] = useState(true);
  const colorTextDark='#FFFFFF';  
  const colorTextLight= '#000000';

  const handleOnLoad = async () => {
     try {
        const list = await fetchPokemonList({ limit: 12, offset: 0 });
        console.log("Fetched Pokémon list:", list);
        setPokemonList(list);
        setDisablePagination(false);
        if(pageCount === 0) setPageCount(Math.ceil(list.count / 12));
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
  };

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    const limit = 12;
    const offset = (page - 1) * limit;
    setDisablePagination(true);
    try {
      const list = await fetchPokemonList({ limit, offset });
      setPokemonList(list);
      setDisablePagination(false);
    } catch (error) {
      console.error(`Error fetching Pokémon list for page ${page}:`, error);
    }
  };

  // useEffect(() => {

  //   async function fetchData() {
  //     try {
  //       const list = await fetchPokemonList({ limit: 12, offset: 0 });
  //       console.log("Fetched Pokémon list:", list);
  //       setPokemonList(list);
  //     } catch (error) {
  //       console.error("Error fetching Pokémon list:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Pokédex</h1>
        <button onClick={handleOnLoad}>Load Pokémon</button>
        <StyledEngineProvider injectFirst>
          <Stack direction={"column"} spacing={2} alignItems={"center"}>
            <Grid container spacing={2}>
              {pokemonList.pokemons.length ? (
                pokemonList.pokemons.map((pokemon) => (
                  <Grid size={4} key={pokemon.name}>
                    <PokemonCard {...pokemon} />
                  </Grid>
                ))
              ) : (
                <p>No Pokémon loaded. Click the button to load Pokémon.</p>
              )}
            </Grid>
            <Stack spacing={2}>
              <Pagination                
                count={pageCount}
                color={"secondary"}              
                renderItem={(item) => (
                  <PaginationItem                   
                  component="a"                  
                    {...item}
                  sx={{
                    '@media (prefers-color-scheme: light)': {
                      color: colorTextLight
                    },
                    '@media (prefers-color-scheme: dark)': {
                      color: colorTextDark
                    }
                  }}                 
                  />
                )}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                disabled={disablePagination}
              />
            </Stack>
          </Stack>
        </StyledEngineProvider>
      </main>
    </div>
  );
}
