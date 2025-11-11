import Image from 'next/image';
import { PokemonSprites } from '@/types/data-types';

interface PokemonSpriteProps {
    name: string;
    sprites: PokemonSprites;
};

export default function PokemonSpritePage({ name, sprites }: PokemonSpriteProps) {
    const url = sprites?.other["official-artwork"]?.front_default
      ? sprites.other["official-artwork"].front_default
      : sprites?.front_default
        ? sprites.front_default
        : "";

    if (!url) {
        return <p>No sprite available for {name}</p>;
    }

    return <Image src={url} alt={name} width={240} height={240} />;   
}