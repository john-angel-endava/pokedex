type PokemonNamedAPIResource = {
  name: string;
  url: string;
};

type PokemonType = {
  slot: number;
  type: PokemonNamedAPIResource;
};

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: PokemonNamedAPIResource;
};

export type PokemonDetail = {
  id: number;
  abilities: PokemonAbility[];
  name: string;
  height: number; // decimeters
  weight: number; // hectograms
  sprites: { front_default: string };
  stats: { stat: PokemonNamedAPIResource; effort: number; base_stat: number }[];
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
