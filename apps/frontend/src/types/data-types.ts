type PokemonNamedAPIResource = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: PokemonNamedAPIResource;
};

export type PokemonSprites = {
  front_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
    };
  }
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: PokemonNamedAPIResource;
};

export type PokemonType = {
  slot: number;
  type: PokemonNamedAPIResource;
};

export type PokemonDetail = {
  id: number;
  abilities: PokemonAbility[];
  name: string;
  height: number; // decimeters
  weight: number; // hectograms
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  pokemons: PokemonDetail[];
};

export type PokemonPagination = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonNamedAPIResource[];
};

export type PokemonFavorites = {
    name: string;
    sprites: PokemonSprites;
    types: PokemonType[];  
}
