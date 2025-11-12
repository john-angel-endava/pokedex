"use client";
import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import styles from "../page.module.css";
import { PokemonFavorites } from "@/types/data-types";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import PokemonCard from "../../components/card/pokemon-card";
import SearchInput from "../../components/search/search-input";
import { useFavoritesStore } from "../../store/useFavoritesStore";

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hasHydrated = useFavoritesStore((s) => s._hasHydrated);
  const [pokemonList] = useState<PokemonFavorites[]>(favorites);
  const [pokemons, setPokemons] = useState<PokemonFavorites[]>(
    favorites.slice(0, ITEMS_PER_PAGE)
  );
  const [pageCount] = useState(
    Math.ceil(favorites.length / ITEMS_PER_PAGE)
  );
  const [page, setPage] = useState(1);
  const colorTextDark = "#FFFFFF";
  const colorTextLight = "#000000";

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    event.preventDefault();
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const pagedPokemons = favorites.slice(offset, offset + ITEMS_PER_PAGE);
    setPokemons(pagedPokemons);
    setPage(page);
  };

  const handleInputChange = (value: string) => {
    if (value.trim() === "") {
      setPokemons(favorites.slice(0, ITEMS_PER_PAGE));
      return;
    }

    setPokemons(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

 if (!hasHydrated) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Stack direction={"column"} spacing={2} alignItems={"center"}>
            <h1>Favorites</h1>
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
          <h1>Favorites</h1>
          <SearchInput
            onDebouncedChange={(value) => handleInputChange(value)}
            fullWidth={true}
          />
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
              />
            </Stack>
          </>
        </Stack>
      </main>
    </div>
  );
}
