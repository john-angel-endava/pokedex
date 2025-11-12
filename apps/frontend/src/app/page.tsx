'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Link, Pagination, PaginationItem, Stack } from "@mui/material";
import styles from "./page.module.css";
import { fetchPokemonList } from "@/lib/poke-api";
import { PokemonDetail, PokemonList } from "@/types/data-types";
import PokemonCard from "@/components/card/pokemon-card";
import SearchInput from "@/components/search/search-input";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonList>({ count: 0, next: null, previous: null, pokemons: [] });
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const colorTextDark='#FFFFFF';  
  const colorTextLight= '#000000';

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    const limit = 12;
    const offset = (page - 1) * limit;
    setIsLoading(true);
    try {      
      const list = await fetchPokemonList({ limit, offset });
      setPokemonList(list);
      setPokemons(list?.pokemons);
      setIsLoading(false);
      setPage(page);
    } catch (error) {
      console.error(`Error fetching Pokémon list for page ${page}:`, error);
    }
  };

  const handleInputChange = (value: string) => {
    setPokemons(
      pokemonList.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

   useEffect(() => {
    async function fetchData() {
      try {
        const list = await fetchPokemonList({ limit: 12, offset: 0 });      
        setPokemonList(list);
        setPokemons(list?.pokemons);
        setIsLoading(false);
        if(pageCount === 0){
          setPageCount(Math.ceil(list.count / 12));
        } 
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    }
    fetchData();
  }, []);

  if(isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Stack direction={"column"} spacing={2} alignItems={"center"}>
            <h1>Pokédex</h1>          
            <CircularProgress size="120px" />
          </Stack>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Stack
          direction={"column"}
          spacing={2}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <h1>Pokédex</h1>
          <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
            <Stack sx={{ flex: 1 }} />
            <SearchInput onDebouncedChange={(value) => handleInputChange(value)} />
            <Stack sx={{ flex: 1, alignItems: 'flex-end' }}>
              <Link href={`/favorites`} sx={{
                textDecoration: 'none',
                "@media (prefers-color-scheme: light)": {
                  color: colorTextLight,
                },
                "@media (prefers-color-scheme: dark)": {
                  color: colorTextDark,
                }}}>
                    Favorites
              </Link>
            </Stack>
          </Stack>
          <>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              {pokemons?.map((pokemon) => (
                <Grid size={4} key={pokemon.name}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
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
                      "@media (prefers-color-scheme: light)": {
                        color: colorTextLight,
                      },
                      "@media (prefers-color-scheme: dark)": {
                        color: colorTextDark,
                      },
                    }}
                  />
                )}
                onChange={handlePageChange}
                page={page}
                showFirstButton
                showLastButton
                disabled={isLoading}
              />
            </Stack>
          </>
        </Stack>
      </main>
    </div>
  );
}
