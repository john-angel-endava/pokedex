import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PokemonCard from '../components/card/pokemon-card';
import { PokemonFavorites } from '@/types/data-types';

const samplePokemon: PokemonFavorites = {
  name: 'pikachu',
  sprites: { 
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: { 'official-artwork': { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' } }
  },
  types: [
    { slot: 1, type: { name: 'electric', url: '' } }
  ]

};

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  args: {
    pokemon: samplePokemon
  },
  argTypes: {
    pokemon: {
      description: 'PokemonFavorites data object',
      control: 'object'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Displays a Pokemon summary card with name, image, types, and a FavoriteButton.'
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const OneType: Story = {};

export const MultipleTypes: Story = {
  args: {
    pokemon: {
      ...samplePokemon,
      types: [
        { slot: 1, type: { name: 'electric', url: '' } },
        { slot: 2, type: { name: 'fairy', url: '' } }
      ]
    }
  }
};

export const WithoutImage: Story = {
  args: {
    pokemon: {
      ...samplePokemon,
      sprites: { front_default: '', other: { 'official-artwork': { front_default: '' } } }
    }
  }
};