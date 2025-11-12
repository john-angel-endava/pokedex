import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FavoriteButton from '../components/favorites/favorite-button';
import { PokemonFavorites } from '@/types/data-types';
import React from 'react';

const samplePokemon: PokemonFavorites = {
  name: 'bulbasaur',
  sprites: { 
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: { 'official-artwork': { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' } }
    },
  types: [
    { slot: 1, type: { name: 'grass', url: '' } },
    { slot: 2, type: { name: 'poison', url: '' } }
  ]
};

const meta: Meta<typeof FavoriteButton> = {
  title: 'Components/FavoriteButton',
  component: FavoriteButton,
  args: {
    pokemon: samplePokemon
  },
  argTypes: {
    pokemon: { control: 'object', description: 'PokemonFavorites object to be stored in favorites.' }
  },
  parameters: {
    docs: {
      description: {
        component: 'Toggle a Pokemon as favorite using the favorites store.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FavoriteButton>;

export const Default: Story = {};