'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Image from 'next/image';
import { PokemonType } from '@/types/pokemon-types';
import styles from "./card.module.css";

type CardProps = { name: string; sprites?: {front_default: string}; types: PokemonType[] };

export default function PokemonCard({ name, sprites, types }: CardProps) {
  return (
    <Link href={`/pokemon/${name}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <Card>
        <CardContent className={styles.card} style={{ textAlign: 'center' }}>
              <h3 style={{ textTransform: 'capitalize' }}>{name}</h3>
              {sprites?.front_default && (
              <Image
                src={sprites.front_default}
                alt={name}
                width={120}
                height={120}
                style={{ marginBottom: '1rem' }}
              />
                 )}
              <Stack direction="row" spacing={1} justifyContent="center">
                {
                  types.map((typeInfo, index) => (
                    <Chip key={typeInfo.type.name} label={typeInfo.type.name} color={index === 0 ? 'primary' : 'secondary'} />
                  ))
                }
              </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}