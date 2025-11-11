import { PokemonDetail, PokemonList } from '../types/data-types';
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';


export async function fetchPokemonList({
  limit,
  offset
}: { limit: number; offset: number }) {  
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`, { cache: 'default' });
  
  if (!res.ok){
    throw new Error(`Failed to fetch list: ${res.status}`);
  } 
  return res.json() as Promise<PokemonList>;
}

export async function fetchPokemonByName(name: string) {
  const res = await fetch(`${BASE}/pokemon/${name}`);
  if (!res.ok){
    throw new Error(`Pokemon "${name}" not found`);
  } 
  return res.json() as Promise<PokemonDetail>;
}