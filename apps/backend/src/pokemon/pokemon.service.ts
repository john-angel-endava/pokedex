import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonDetail, PokemonList, PokemonPagination } from './pokemon.types';

const POKEAPI = 'https://pokeapi.co/api/v2';

@Injectable()
export class PokemonService {
  constructor(private readonly http: HttpService) {}

  async list(offset: number, limit: number): Promise<PokemonList> {
    const url = `${POKEAPI}/pokemon`;
    const response = await this.http.axiosRef.get(url, {
      params: { offset, limit },
    });
    if (response.status !== 200) {
      return {
        count: 0,
        next: null,
        previous: null,
        pokemons: [],
      };
    }

    const resources = response.data as PokemonPagination;
    const pokemons: PokemonDetail[] = [];
    for (const item of resources.results) {
      try {
        const response = await this.detail(item.name);
        pokemons.push(response);
      } catch (error) {
        //TODO: Log this error properly
        console.error(
          `Failed to fetch details for Pokémon ${item.name}:`,
          error,
        );
      }
    }

    return {
      count: resources.count,
      next: resources.next,
      previous: resources.previous,
      pokemons,
    };
  }

  async detail(name: string): Promise<PokemonDetail> {
    const url = `${POKEAPI}/pokemon/${name}`;
    const response = await this.http.axiosRef.get(url);
    if (response.status === 404) {
      throw new NotFoundException(`Pokémon ${name} not found`);
    }
    if (response.status !== 200) {
      throw new Error(
        `Error fetching Pokémon ${name} details. Status: ${response.status}`,
      );
    }

    const data: PokemonDetail = response.data as PokemonDetail;
    const detail: PokemonDetail = {
      id: data.id,
      name: data.name,
      abilities: data.abilities,
      height: data.height,
      weight: data.weight,
      sprites: {
        front_default: data.sprites?.front_default ?? null,
      },
      stats: data.stats,
      types: data.types,
    };
    return detail;
  }
}
