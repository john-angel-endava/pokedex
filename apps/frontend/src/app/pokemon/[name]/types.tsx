import { Chip, Stack, Typography } from '@mui/material';
import { PokemonType } from '@/types/data-types';

interface PokemonTypesProps {
  types: PokemonType[];
}

export default function PokemonTypesPage({ types }: PokemonTypesProps) {
    return (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="left"
        alignItems={"center"}
      >
        <Typography variant="body1">Types:</Typography>
        {types?.map((typeInfo, index) => (
          <Chip
            key={typeInfo.type.name}
            label={typeInfo.type.name}
            color={index === 0 ? "primary" : "secondary"}
          />
        ))}
      </Stack>
    );
}